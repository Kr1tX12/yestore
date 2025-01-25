"use client";

import { FolderType } from "@/components/fileSystems/types";
import { GridFileSystem } from "@/components/fileSystems/grid-file-system/_index";
import { GridFileSystemProvider } from "@/components/fileSystems/grid-file-system/_index";
import { Separator } from "@/components/ui/separator";
import FilesBreadcrumb from "./components/files-breadcrumb";
import { usePath } from "@/components/fileSystems/providers/PathContext";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, FolderIcon } from "lucide-react";
import { getIconForFolder } from "@/components/fileSystems/utils";
import SelectModeToggle from "./components/select-mode-toggle";
import AddFilesButton from "./components/add-files-button";
import { FilesProvider } from "./components/providers/files-provider";
import { UploadingFilesProvider } from "./components/providers/uploading-files-provider";

const rootFolder: FolderType = {
  id: "1",
  name: "Home",
  contents: [
    {
      id: "5",
      name: "Code",
      contents: [
        {
          id: "6",
          name: "index",
          extension: "css",
          size: 23456,
          lastModified: new Date("2025-01-01"),
        },
        {
          id: "7",
          name: "index",
          extension: "css",
          size: 34567,
          lastModified: new Date("2025-01-01"),
        },
      ],
    },
    {
      id: "8",
      name: "Music",
      contents: [
        {
          id: "9",
          name: "Song1",
          extension: "mp3",
          size: 54321,
          lastModified: new Date("2025-01-01"),
        },
        {
          id: "10",
          name: "Song2",
          extension: "mp3",
          size: 98765,
          lastModified: new Date("2025-01-01"),
        },
      ],
    },
    {
      id: "11",
      name: "Videos",
      contents: [
        {
          id: "12",
          name: "Video1",
          extension: "mp4",
          size: 123456,
          lastModified: new Date("2025-01-01"),
        },
        {
          id: "13",
          name: "Video2",
          extension: "mp4",
          size: 654321,
          lastModified: new Date("2025-01-01"),
        },
      ],
    },
    {
      id: "14",
      name: "Projects",
      contents: [
        {
          id: "15",
          name: "Project1",
          contents: [
            {
              id: "16",
              name: "Design",
              extension: "psd",
              size: 45678,
              lastModified: new Date("2025-01-01"),
            },
            {
              id: "17",
              name: "Specs",
              extension: "docx",
              size: 56789,
              lastModified: new Date("2025-01-01"),
            },
          ],
        },
        {
          id: "18",
          name: "Project2",
          contents: [
            {
              id: "19",
              name: "Presentation",
              extension: "pptx",
              size: 67890,
              lastModified: new Date("2025-01-01"),
            },
          ],
        },
      ],
    },
  ],
};

const FilesPage = () => {
  return (
    <GridFileSystemProvider>
      <FilesProvider>
        <FilesPageWithProvider />
      </FilesProvider>
    </GridFileSystemProvider>
  );
};

const FilesPageWithProvider = () => {
  const { path, setPath } = usePath();
  const folderNow = path && path[path.length - 1];

  const toPreviousPath = () => {
    if (path && path?.length <= 1) return;

    setPath(path?.slice(0, length - 1) ?? []);
  };

  const NowFolderIcon = folderNow ? getIconForFolder(folderNow) : FolderIcon;

  return (
    <div className="my-16 w-full flex flex-col">
      <div className="flex w-full px-12 items-center justify-between">
        <div className="flex w-full items-center gap-2">
          {path && path.length > 1 && (
            <Button onClick={toPreviousPath} variant="ghost" size="icon">
              <ChevronLeftIcon />
            </Button>
          )}
          <h1 className="text-2xl font-bold">
            {folderNow && folderNow.name !== "Home" ? (
              <span className="flex gap-2 items-center">
                <NowFolderIcon /> {folderNow.name}
              </span>
            ) : (
              "Все файлы"
            )}
          </h1>
        </div>
        <div className="flex gap-2 items-center">
          <UploadingFilesProvider>
            <AddFilesButton />
          </UploadingFilesProvider>
          <SelectModeToggle />
        </div>
      </div>
      <Separator className="my-3" />
      <FilesBreadcrumb className="ml-12 mb-6" />

      <GridFileSystem rootFolder={rootFolder} hideFirst />
    </div>
  );
};

export default FilesPage;
