import GridFileSystem from "@/components/fileSystems/grid-file-system/GridFileSystem";
import FileSystemProvider from "@/components/fileSystems/providers/FileSystemProvider";
import { getFiles } from "@/lib/actions/files.actions";
import { notFound } from "next/navigation";
import FilesBreadcrumb from "../files/components/files-breadcrumb/files-breadcrumb";
import { FilesPageFlex } from "../files/components/files-page/files-page-flex";
import { FileSystemOptions } from "../files/components/files-page/header/file-system-options";
import { FilesPageHeader } from "../files/components/files-page/header/files-pages-header";
import { FolderNowInfo } from "../files/components/files-page/header/folder-now-info";
import { convertToFileType } from "@/lib/utils";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import FileSystemGrid from "@/components/fileSystems/grid-file-system/components/file-system-grid";
import { FolderType } from "../../../../../types";

const filesPageTypes = ["images", "videos", "documents", "audio", "others"];

// Выносим асинхронную часть в отдельный компонент
async function FileSystemContent({ type }: { type: string }) {

  console.log("updating page loading files ")
  const files = await getFiles();
  const convertedFiles = files.documents.map(convertToFileType);

  const rootFolder: FolderType = {
    name: "Home",
    id: "root",
    contents: convertedFiles,
  };

  return (
    <>
      <FilesPageHeader>
        <FolderNowInfo />
        <FileSystemOptions />
      </FilesPageHeader>

      <div className="bg-border h-px my-3" />
      <FilesBreadcrumb className="ml-12 mb-6" />

      <GridFileSystem rootFolder={rootFolder} hideFirst />
    </>
  );
}

const Page = async ({ params }: { params: Promise<{type: string}> }) => {
  const type = (await params).type;

  if (!filesPageTypes.includes(type)) return notFound();

  return (
    <FileSystemProvider rootFolder={}>
      <FilesPageFlex>
        <Suspense
          fallback={
            <>
              <FilesPageHeader>
                <Skeleton className="w-64 h-9" />
                <div className="flex gap-2">
                  <Skeleton className="w-28 h-9" />
                  <Skeleton className="w-9 h-9" />
                </div>
              </FilesPageHeader>
              <div className="bg-border h-px my-3" />
              <FileSystemGrid>
                {Array.from({ length: 23 }).map((_, i) => (
                  <div
                    key={i}
                    className="size-36 flex flex-col gap-2 items-center p-2"
                  >
                    <Skeleton className="size-24" />
                    <Skeleton className="h-2 w-20" />
                  </div>
                ))}
              </FileSystemGrid>
            </>
          }
        >
          <FileSystemContent type={type} />
        </Suspense>
      </FilesPageFlex>
    </FileSystemProvider>
  );
};

export default Page;
