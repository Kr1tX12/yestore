import { UploadProgress } from "node-appwrite";

export interface UplodaFileProps {
  file: File;
  ownerId: string;
  accountId: string;
  path: string;
  onProgress: (progress: UploadProgress) => void
}

export type FileType = {
  id: string;
  url: string;
  name: string;
  size: number;
  lastModified: string;
  bucketFileId: string;
  ownerId: string;
  users: string[];
};
export type FolderType = {
  id: string;
  name: string;
  contents: (FileType | FolderType)[];
};
