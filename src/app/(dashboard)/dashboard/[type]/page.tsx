// page.tsx
import { notFound } from "next/navigation";
import { FilesPageFlex } from "../files/components/files-page/files-page-flex";
import { FileSystemContent } from "./FileSystemContent";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { FilesPageHeader } from "../files/components/files-page/header/files-pages-header";
import FileSystemGrid from "@/components/fileSystems/grid-file-system/components/file-system-grid";
import { OneMinusConstantAlphaFactor } from "three";

const filesPageTypes = [
  "image",
  "video",
  "document",
  "audio",
  "other",
  "files",
];

export default async function Page({
  params,
  searchParams,
}: {
  params: { type: string };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { type } = await params;

  const searchText = (await searchParams)?.query || "";
  const sort = (await searchParams)?.sort || "";
  const limit = Number((await searchParams)?.limit) || 25;
  if (searchText instanceof Array || sort instanceof Array) return;

  if (!filesPageTypes.includes(type)) return notFound();

  return (
    <FilesPageFlex>
      <Suspense fallback={<LoadingSkeleton />}>
        {/* Асинхронный серверный компонент */}
        <FileSystemContent
          key={`${Math.random()}`}
          type={type}
          searchText={searchText}
          sort={sort}
          limit={limit}
        />
      </Suspense>
    </FilesPageFlex>
  );
}

function LoadingSkeleton() {
  return (
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
          <div key={i} className="size-36 flex flex-col gap-2 items-center p-2">
            <Skeleton className="size-24" />
            <Skeleton className="h-2 w-20" />
          </div>
        ))}
      </FileSystemGrid>
    </>
  );
}
