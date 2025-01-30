"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { FileType, FolderType } from "../../../../types";

type SingleSelectedContextType = {
  singleSelected: FileType | FolderType | null;
  setSingleSelected: React.Dispatch<
    React.SetStateAction<FileType | FolderType | null>
  >;
};

const SingleSelectedContext = createContext<
  SingleSelectedContextType | undefined
>(undefined);

export const SingleSelectedProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [singleSelected, setSingleSelected] = useState<
    FileType | FolderType | null
  >(null);


  return (
    <SingleSelectedContext.Provider
      value={{ singleSelected, setSingleSelected }}
    >
      {children}
    </SingleSelectedContext.Provider>
  );
};

export const useSingleSelected = () => {
  const context = useContext(SingleSelectedContext);
  if (!context) {
    throw new Error("useSelected must be used within a SelectedProvider");
  }
  return context;
};
