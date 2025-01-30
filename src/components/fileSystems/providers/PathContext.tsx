"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { FolderType } from "../../../../types";

type SelectedContextType = {
  path: FolderType[] | null;
  setPath: React.Dispatch<React.SetStateAction<FolderType[] | null>>;
};

const PathContext = createContext<SelectedContextType | undefined>(undefined);

export const PathProvider = ({ children }: { children: ReactNode }) => {
  const [path, setPath] = useState<FolderType[] | null>(null);

  return (
    <PathContext.Provider value={{ path, setPath }}>
      {children}
    </PathContext.Provider>
  );
};

export const usePath = () => {
  const context = useContext(PathContext);
  if (!context) {
    throw new Error("useSelected must be used within a provider");
  }
  return context;
};
