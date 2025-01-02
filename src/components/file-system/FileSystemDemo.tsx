"use client";

import FileSystem from "./FileSystem";
import FileSystemProvider from "./context/FileSystemProvider";
import { SelectedProvider } from "./context/SelectedContext";
import { FolderType } from "./types";

const rootFolder: FolderType = {
  id: "1",
  name: "Root",
  contents: [
    {
      id: "5",
      name: "Code",
      contents: [
        { id: "6", name: "index", extension: "css", size: 23456 },
        { id: "7", name: "index", extension: "css", size: 34567 },
      ],
    },
    {
      id: "8",
      name: "Music",
      contents: [
        { id: "9", name: "Song1", extension: "mp3", size: 54321 },
        { id: "10", name: "Song2", extension: "mp3", size: 98765 },
      ],
    },
    {
      id: "11",
      name: "Videos",
      contents: [
        { id: "12", name: "Video1", extension: "mp4", size: 123456 },
        { id: "13", name: "Video2", extension: "mp4", size: 654321 },
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
            { id: "16", name: "Design", extension: "psd", size: 45678 },
            { id: "17", name: "Specs", extension: "docx", size: 56789 },
          ],
        },
        {
          id: "18",
          name: "Project2",
          contents: [
            { id: "19", name: "Presentation", extension: "pptx", size: 67890 },
          ],
        },
      ],
    },
  ],
};

const FileSystemDemo = ({ className, height }: { className?: string, height?: number }) => {
  console.log(className)
  return (
    <FileSystemProvider>
      <FileSystem
        title="Моё облако"
        rootFolder={rootFolder}
        hideFirst={true}
        className={className}
        openFolders
        height={height}
      />

    </FileSystemProvider>
  );
};

export default FileSystemDemo;
