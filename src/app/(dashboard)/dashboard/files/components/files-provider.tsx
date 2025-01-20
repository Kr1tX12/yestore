'use client';

import React, { useContext } from "react";
import { createContext, useState } from "react";

type FilesContextType = {
    files: File[] | undefined;
    setFiles: React.Dispatch<React.SetStateAction<File[]| undefined>> | undefined;
} | undefined;
const filesContext = createContext<FilesContextType>(undefined);

export const FilesProvider = ({ children }: { children: React.ReactNode }) => {
  const [files, setFiles] = useState<File[]>();
  return <filesContext.Provider value={{files, setFiles}}>{children}</filesContext.Provider>;
};

export const useFiles = () => {
    const context = useContext(filesContext);
    if (!context) {
        throw new Error("useFiles must be used within a provider");
    }
    return context;
};