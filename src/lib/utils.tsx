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
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import GridFile from "@/components/fileSystems/grid-file-system/file/GridFile";
import GridFolder from "@/components/fileSystems/grid-file-system/folder/GridFolder";
import Folder from "@/components/fileSystems/file-system/folder/Folder";
import File from "@/components/fileSystems/file-system/file/File";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { Models } from "node-appwrite";
import { FileType, FolderType } from "../../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseStringify(value: unknown) {
  return JSON.parse(JSON.stringify(value));
}

/**
 * Возвращает правильную форму слова в зависимости от количества.
 *
 * @param {number} count - Количество элементов, для которых нужно определить форму слова.
 * @param {string[]} wordForms - Массив из трех строк, содержащий формы слова:
 *   - wordForms[0]: Форма слова для одного элемента (например, "файл").
 *   - wordForms[1]: Форма слова для нескольких элементов (например, "файла").
 *   - wordForms[2]: Форма слова для многих элементов (например, "файлов").
 *
 * @returns {string} - Правильная форма слова в зависимости от количества.
 *
 * @example
 * const words = {
 *   files: ['файл', 'файла', 'файлов'],
 *   apples: ['яблоко', 'яблока', 'яблок'],
 *   cars: ['машина', 'машины', 'машин']
 * };
 *
 * const countFiles = 5;
 * console.log(`Выбрано ${countFiles} ${getWordEnding(countFiles, words.files)}`);
 * // Вывод: "Выбрано 5 файлов"
 *
 * const countApples = 21;
 * console.log(`Куплено ${countApples} ${getWordEnding(countApples, words.apples)}`);
 * // Вывод: "Куплено 21 яблоко"
 *
 * const countCars = 14;
 * console.log(`Продано ${countCars} ${getWordEnding(countCars, words.cars)}`);
 * // Вывод: "Продано 14 машин"
 */
export function getWordEnding(count: number, wordForms: string[]): string {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return wordForms[2];
  }

  switch (lastDigit) {
    case 1:
      return wordForms[0];
    case 2:
    case 3:
    case 4:
      return wordForms[1];
    default:
      return wordForms[2];
  }
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const convertFileSize = (sizeInBytes: number, digits?: number) => {
  if (sizeInBytes < 1024) {
    return sizeInBytes + " Bytes"; // Less than 1 KB, show in Bytes
  } else if (sizeInBytes < 1024 * 1024) {
    const sizeInKB = sizeInBytes / 1024;
    return sizeInKB.toFixed(digits || 1) + " KB"; // Less than 1 MB, show in KB
  } else if (sizeInBytes < 1024 * 1024 * 1024) {
    const sizeInMB = sizeInBytes / (1024 * 1024);
    return sizeInMB.toFixed(digits || 1) + " MB"; // Less than 1 GB, show in MB
  } else {
    const sizeInGB = sizeInBytes / (1024 * 1024 * 1024);
    return sizeInGB.toFixed(digits || 1) + " GB"; // 1 GB or more, show in GB
  }
};

export const calculatePercentage = (sizeInBytes: number) => {
  const totalSizeInBytes = 2 * 1024 * 1024 * 1024; // 2GB in bytes
  const percentage = (sizeInBytes / totalSizeInBytes) * 100;
  return Number(percentage.toFixed(2));
};

export const getFileType = (fileName: string) => {
  const extension = getFileExtension(fileName);

  if (!extension) return "other";

  const documentExtensions = [
    "pdf",
    "doc",
    "docx",
    "txt",
    "xls",
    "xlsx",
    "csv",
    "rtf",
    "ods",
    "ppt",
    "odp",
    "md",
    "html",
    "htm",
    "epub",
    "pages",
    "fig",
    "psd",
    "ai",
    "indd",
    "xd",
    "sketch",
    "afdesign",
    "afphoto",
    "afphoto",
  ];
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
  const videoExtensions = ["mp4", "avi", "mov", "mkv", "webm"];
  const audioExtensions = ["mp3", "wav", "ogg", "flac"];

  if (documentExtensions.includes(extension)) return "document";
  if (imageExtensions.includes(extension)) return "image";
  if (videoExtensions.includes(extension)) return "video";
  if (audioExtensions.includes(extension)) return "audio";

  return "other";
};

export const formatDateTime = (isoString: string | null | undefined) => {
  if (!isoString) return "—";

  const date = new Date(isoString);

  // Форматирование времени в 24-часовом формате
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;

  // Форматирование даты
  const day = date.getDate();
  const monthNames = [
    "янв",
    "фев",
    "мар",
    "апр",
    "май",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек",
  ];
  const month = monthNames[date.getMonth()];

  return `${day} ${month}, ${time}`;
};

// APPWRITE URL UTILS
// Construct appwrite file URL - https://appwrite.io/docs/apis/rest#images
export const constructFileUrl = (bucketFileId: string) => {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET}/files/${bucketFileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;
};

export const constructDownloadUrl = (bucketFileId: string) => {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET}/files/${bucketFileId}/download?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;
};


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
  return folder.contents.map((item: FileType | FolderType) => {
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

      const extension = getFileExtension(item.name);
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

export const getFileExtension = (name: string) => {
  return name.split(".").pop()?.toLowerCase() ?? "";
};
export const convertToFileType = (file: File & Models.Document): FileType => {
  const { $id, url } = file;

  const convertedFile: FileType = {
    name: file.name,
    lastModified: file.$updatedAt,
    size: file.size,
    id: $id,
    url: url,
    bucketFileId: file.bucketFileId,
    ownerId: file.owner.$id,
    users: file.users,
  };
  return convertedFile;
};

export const getSizeOfFolder = (folder: FolderType) => {
  let size = 0;
  folder.contents.forEach((item) => {
    if (isFolder(item)) {
      size += getSizeOfFolder(item);
    } else {
      size += item.size;
    }
  });
  return size;
};

export const removeExtensionFromFile = (fileName: string) => {
  return fileName.replace(/\.[^.]+$/, "");
};
