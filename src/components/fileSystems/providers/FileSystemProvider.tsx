import React from "react";
import { SelectedProvider } from "./SelectedContext";
import { SingleSelectedProvider } from "./SingleSelectedContext";
import { PathProvider } from "./PathContext";
import { FilesProvider } from "./files-provider";
import { FolderType } from "../../../../types";

const FileSystemProvider = ({ children, rootFolder }: { children: React.ReactNode, rootFolder: FolderType }) => {
  return (
    <SelectedProvider>
      <SingleSelectedProvider>
        <FilesProvider rootFolder={rootFolder} >
          <PathProvider>{children}</PathProvider>
        </FilesProvider>
      </SingleSelectedProvider>
    </SelectedProvider>
  );
};

export default FileSystemProvider;
