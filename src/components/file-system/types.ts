export type FileType = {
    id: string;
    name: string;
    extension: string;
    size: number;
    lastModified: Date;
};

export type FolderType = {
    id: string;
    name: string;
    contents: (FileType | FolderType)[];
};