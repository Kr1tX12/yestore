"use client";

import React, { useContext } from "react";
import { createContext, useState } from "react";

type FilesContextType =
  | {
      files: File[];
      setFiles: React.Dispatch<React.SetStateAction<File[]>>;
    }
  | undefined;
const filesContext = createContext<FilesContextType>(undefined);

export const UploadingFilesProvider = ({ children }: { children: React.ReactNode }) => {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <filesContext.Provider value={{ files, setFiles }}>
      {children}
    </filesContext.Provider>
  );
};

export const useUploadingFiles = () => {
  const context = useContext(filesContext);
  if (!context) {
    throw new Error("useUploadingFiles must be used within a provider");
  }
  return context;
};
