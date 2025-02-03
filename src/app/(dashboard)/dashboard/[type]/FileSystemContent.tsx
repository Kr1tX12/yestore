// FileSystemContent.tsx
import { getFiles } from "@/lib/actions/files.actions";
import { convertFileSize, convertToFileType, getWordEnding } from "@/lib/utils";
import { FolderType } from "../../../../../types";
import { FilesPageHeader } from "../files/components/files-page/header/files-pages-header";
import { FolderNowInfo } from "../files/components/files-page/header/folder-now-info";
import { FileSystemOptions } from "../files/components/files-page/header/file-system-options";
import GridFileSystem from "@/components/fileSystems/grid-file-system/GridFileSystem";
import FileSystemProvider from "@/components/fileSystems/providers/FileSystemProvider";
import { isFolder } from "../../../../lib/utils";

export async function FileSystemContent({
  type,
  searchText,
  sort,
  limit,
}: {
  type: string;
  searchText: string;
  sort: string;
  limit: number;
}) {
  const rootFolder = await getRootFolder([type], searchText, sort, limit);
  
  return (
    <FileSystemProvider rootFolder={rootFolder}>
      <FilesPageHeader>
        <FolderNowInfo />
        <FileSystemOptions />
      </FilesPageHeader>
      <div className="bg-border h-px my-3" />
      {/* <FilesBreadcrumb className="ml-12 mb-6" /> */}
      <div className="px-12 flex justify-between w-full mb-2">
        <div className="text-muted-foreground text-sm">
          Всего: {rootFolder.contents.length}{" "}
          {getWordEnding(rootFolder.contents.length, [
            "файл",
            "файла",
            "файлов",
          ])}
        </div>
        <div className="text-muted-foreground text-sm">
          Общий размер:{" "}
          {convertFileSize(
            rootFolder.contents.reduce(
              (acc, file) => acc + (isFolder(file) ? 0 : file.size),
              0
            )
          )}
        </div>
      </div>
      {rootFolder.contents.length > 0 ? (
          <GridFileSystem hideFirst />
      ) : (
        <div className="flex flex-col justify-center items-center size-full gap-4">
          <img
            src="/images/not-found.png"
            alt="Not found"
            className="size-32"
          />
          <p className="mb-24 text-muted-foreground text-xl">
            Ничего не найдено
          </p>
        </div>
      )}
    </FileSystemProvider>
  );
}

async function getRootFolder(
  types: string[],
  searchText: string,
  sort: string,
  limit: number
): Promise<FolderType> {
  const files = await getFiles({ types, searchText, sort, limit });

  return {
    name: "Home",
    id: "root",
    contents: files.documents.map(convertToFileType),
  };
}
