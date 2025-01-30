"use client";

import React, { useContext } from "react";
import { createContext, useState } from "react";
import { FolderType } from "../../../../types";

type FilesContextType =
  | {
      files: FolderType;
      setFiles: React.Dispatch<React.SetStateAction<FolderType>>;
    }
  | undefined;
const filesContext = createContext<FilesContextType>(undefined);

export const FilesProvider = ({ children, rootFolder }: { children: React.ReactNode, rootFolder: FolderType }) => {
  const [files, setFiles] = useState<FolderType>(rootFolder);
  return (
    <filesContext.Provider value={{ files, setFiles }}>
      {children}
    </filesContext.Provider>
  );
};

export const useFiles = () => {
  const context = useContext(filesContext);
  if (!context) {
    throw new Error("useFiles must be used within a provider");
  }
  return context;
};
