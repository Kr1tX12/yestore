import Folder from "./file-system/folder/Folder";
import { FileType, FolderType } from "./types";
import File from "./file-system/file/File";
import {
  FileAudioIcon,
  FileCode,
  FileIcon,
  FileJson,
  FileTextIcon,
  FileVideoIcon,
  FolderCodeIcon,
  FolderIcon,
  FolderKanbanIcon,
  FolderMinusIcon,
  FolderPenIcon,
  ImageIcon,
  LucideProps,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import GridFolder from "./grid-file-system/folder/GridFolder";
import GridFile from "./grid-file-system/file/GridFile";
import crypto from 'node:crypto';
import { getFileType, getFileTypesParams } from "@/lib/utils";

export const isFolder = (
  element: FileType | FolderType | null | undefined
): element is FolderType => {
  return !!element && "contents" in element && Array.isArray(element.contents);
};

export const getItemsFromFolder = (
  folder: FolderType,
  autoOpen: boolean,
  type: "grid" | "list"
): React.ReactNode => {
  return folder.contents.map((item) => {
    if (isFolder(item)) {
      return {
        grid: <GridFolder folder={item} key={item.id} />,
        list: <Folder autoOpen={autoOpen} folder={item} key={item.id} />,
      }[type];
    } else {
      return {
        list: <File file={item} key={item.id} />,
        grid: <GridFile file={item} key={item.id} />,
      }[type];
    }
  });
};

type SupportedExtensions =
  | "mp4"
  | "mp3"
  | "png"
  | "jpg"
  | "jpeg"
  | "gif"
  | "svg"
  | "txt"
  | "json"
  | "xml"
  | "yaml"
  | "css"
  | "html";

export const getIconForFile = (extension: string) => {
  const icons: Record<
    SupportedExtensions,
    ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >
  > = {
    mp4: FileVideoIcon,
    mp3: FileAudioIcon,
    png: ImageIcon,
    jpg: ImageIcon,
    jpeg: ImageIcon,
    gif: ImageIcon,
    svg: ImageIcon,
    txt: FileTextIcon,
    json: FileJson,
    xml: FileCode,
    yaml: FileJson,
    css: FileJson,
    html: FileCode,
  };

  return icons[extension as SupportedExtensions] || FileIcon;
};

export const getIconForFolder = (folder: FolderType) => {
  if (folder.contents.length === 0) {
    return FolderMinusIcon;
  }

  const findTheMostUsedExtension = () => {
    const extensionsFilesAmount: Record<string, number> = {};

    folder.contents.forEach((item) => {
      if (isFolder(item)) return;

      const extension = item.extension;
      if (extension) {
        extensionsFilesAmount[extension] =
          (extensionsFilesAmount[extension] || 0) + 1;
      }
    });

    let mostUsedExtension = "";
    let maxCount = 0;

    for (const [extension, count] of Object.entries(extensionsFilesAmount)) {
      if (count > maxCount) {
        maxCount = count;
        mostUsedExtension = extension;
      }
    }

    return mostUsedExtension;
  };

  const mostUsedExtension = findTheMostUsedExtension();
  return (
    {
      mp4: FolderKanbanIcon,
      mp3: FolderKanbanIcon,
      png: FolderKanbanIcon,
      jpg: FolderKanbanIcon,
      jpeg: FolderKanbanIcon,
      gif: FolderKanbanIcon,
      svg: FolderKanbanIcon,
      txt: FolderPenIcon,
      json: FolderCodeIcon,
      xml: FolderCodeIcon,
      yaml: FolderCodeIcon,
      html: FolderCodeIcon,
      css: FolderCodeIcon,
    }[mostUsedExtension] ?? FolderIcon
  );
};
export const convertToFileType = (file: File): FileType => {
  const lastDotIndex = file.name.lastIndexOf('.');
  const name = lastDotIndex !== -1 ? file.name.substring(0, lastDotIndex) : file.name;
  const extension = lastDotIndex !== -1 ? file.name.substring(lastDotIndex + 1) : '';

  return {
    id: crypto.randomBytes(16).toString('hex'),
    name: name,
    extension: extension,
    size: file.size,
    lastModified: new Date(file.lastModified),
  };
};