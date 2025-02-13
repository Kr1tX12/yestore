"use server";

import { ID, Models, Query } from "node-appwrite";
import { DashboardStatsType, UplodaFileProps } from "../../../types";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { InputFile } from "node-appwrite/file";
import {
  constructFileUrl, getFileExtension,
  getFileType,
  parseStringify
} from "../utils";
import { getCurrentUser } from "./user.actions";
import { revalidatePath } from "next/cache";

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

export const uploadFile = async ({
  file,
  ownerId,
  accountId,
  path,
}: UplodaFileProps) => {
  const { storage, databases } = await createAdminClient();

  try {
    const inputFile = InputFile.fromBuffer(file, file.name);

    const bucketFile = await storage.createFile(
      appwriteConfig.bucketId,
      ID.unique(),
      inputFile
    );

    const fileDocument = {
      type: getFileType(bucketFile.name),
      extension: getFileExtension(bucketFile.name),
      name: bucketFile.name,
      url: constructFileUrl(bucketFile.$id),
      size: bucketFile.sizeOriginal,
      owner: ownerId,
      accountId: accountId,
      users: [],
      bucketFileId: bucketFile.$id,
    };

    const newFile = await databases
      .createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.filesCollectionId,
        ID.unique(),
        fileDocument
      )
      .catch(async (error: unknown) => {
        await storage.deleteFile(appwriteConfig.bucketId, bucketFile.$id);
        handleError(error, "Не удалось загрузить файл");
      });

    revalidatePath(path);

    return parseStringify(newFile);
  } catch (error) {
    handleError(error, "Не удалось загрузить файл");
  }
};

export const getFiles = async ({
  types = [],
  searchText,
  sort = "$createdAt-desc",
  limit = 25,
  page = 1,
}: {
  types?: string[];
  searchText?: string;
  sort?: string;
  limit?: number;
  page?: number;
}) => {
  const offset = (page - 1) * limit;
  const { databases } = await createAdminClient();
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error("Пользователь не найден");
    }
    const queries = createQueries(currentUser, types, searchText, sort, limit, offset);
    const files = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      queries
    );

    return parseStringify(files);
  } catch (error) {
    handleError(error, "Не удалось получить файлы");
  }
};

const createQueries = (
  currentUser: Models.Document,
  types?: string[],
  searchText?: string,
  sort?: string,
  limit?: number,
  offset?: number,
) => {
  const queries = [
    Query.or([
      Query.equal("owner", [currentUser.$id]),
      Query.contains("users", [currentUser.email]),
    ]),
  ];
  if (types && types.length > 0 && !types.includes("files"))
    queries.push(Query.equal("type", types));

  if (searchText) queries.push(Query.contains("name", searchText));
  if (limit) queries.push(Query.limit(limit));
  if (offset) queries.push(Query.offset(offset));
  if (sort) {
    const [sortBy, orderBy] = sort.split("-");
    queries.push(
      orderBy === "desc" ? Query.orderDesc(sortBy) : Query.orderAsc(sortBy)
    );
  }
  return queries;
};

export const renameFile = async ({
  fileId,
  name,
  extension,
  path,
}: {
  fileId: string;
  name: string;
  extension: string;
  path: string;
}) => {
  const { databases } = await createAdminClient();
  try {
    const newName = `${name}.${extension}`;
    const updatedFile = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      fileId,
      { name: newName }
    );

    revalidatePath(path);

    return parseStringify(updatedFile);
  } catch (e) {
    handleError(e, "Не удалось переименовать файл");
  }
};

export const updateFileUsers = async ({
  fileId,
  emails,
  path,
}: {
  fileId: string;
  emails: string[];
  path: string;
}) => {
  const { databases } = await createAdminClient();
  try {
    const updatedFile = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      fileId,
      { users: emails }
    );

    revalidatePath(path);

    return parseStringify(updatedFile);
  } catch (e) {
    handleError(e, "Не удалось переименовать файл");
  }
};

export const deleteFile = async ({
  fileId,
  bucketFileId,
  path,
}: {
  fileId: string;
  bucketFileId: string;
  path: string;
}) => {
  const { databases, storage } = await createAdminClient();

  try {
    const deletedFile = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      fileId
    );
    if (deletedFile) {
      storage.deleteFile(appwriteConfig.bucketId, bucketFileId);
    }
    revalidatePath(path);

    return parseStringify({ status: "success" });
  } catch (error) {
    handleError(error, "Не удалось удалить файл");
  }
};

export const getDashboardStats = async (): Promise<DashboardStatsType> => {
  const allFiles = await getFiles({ limit: 100000, sort: "$createdAt-desc" });
  const totalSize = allFiles.documents.reduce((acc: number, file: Models.Document) => acc + file.size, 0);
  const filesCount = allFiles.documents.length;
  const fileTypes = {
    image: {
      size: 0,
      count: 0,
    },
    video: {
      size: 0,
      count: 0,
    },
    document: {
      size: 0,
      count: 0,
    },
    audio: {
      size: 0,
      count: 0,
    },
    other: {
      size: 0,
      count: 0,
    },
  };
  const latest5Files = allFiles.documents.slice(0, 5);
  const biggest5Files = allFiles.documents.sort((a: Models.Document, b: Models.Document) => b.size - a.size).slice(0, 5);

  allFiles.documents.forEach((file: Models.Document) => {
    const fileType = getFileType(file.name);
    fileTypes[fileType].size += file.size;
    fileTypes[fileType].count++;
  });

  return {
    allFiles,
    totalSize,
    filesCount,
    fileTypes,
    latest5Files,
    biggest5Files,
  }
};
