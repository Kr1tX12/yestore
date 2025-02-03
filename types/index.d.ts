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


export type FileFilterType = "image" | "video" | "document" | "audio" | "other";

export type DashboardStatsType = {
  allFiles: Models.DocumentList<Models.Document>;
  totalSize: number;
  filesCount: number;
  fileTypes: {
    [key: FileFilterType]: {
      count: number;
      size: number;
    }
  };
  latest5Files: Models.Document[];
  biggest5Files: Models.Document[];
}