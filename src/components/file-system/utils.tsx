import Folder from "./folder/Folder";
import File from "./file/File";
import { FileType, FolderType } from "./types";
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
import { FC, ForwardRefExoticComponent, RefAttributes } from "react";

export const isFolder = (
  element: FileType | FolderType | null | undefined
): element is FolderType => {
  return !!element && "contents" in element && Array.isArray(element.contents);
};

export const getItemsFromFolder = (folder: FolderType, autoOpen: boolean): React.ReactNode => {
  return folder.contents.map((item) => {
    if (isFolder(item)) {
      return <Folder autoOpen={autoOpen} folder={item} key={item.id} />;
    } else {
      return <File file={item} key={item.id} />;
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

export const getIconForFile = (file: FileType) => {
  const icons: Record<SupportedExtensions, ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>> = {
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

  return icons[file.extension as SupportedExtensions] || FileIcon;
};

export const getIconForFolder = (folder: FolderType) => {
  if (folder.contents.length === 0) {
    return FolderMinusIcon
  }

  const findTheMostUsedExtension = () => {
    const extensionsFilesAmount: Record<string, number> = {};

    folder.contents.forEach((item) => {
      if (isFolder(item)) return;

      const extension = item.extension;
      if (extension) {
        extensionsFilesAmount[extension] = (extensionsFilesAmount[extension] || 0) + 1;
      }
    });

    let mostUsedExtension = '';
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
  return {
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
  }[mostUsedExtension] ?? FolderIcon;
};
  
