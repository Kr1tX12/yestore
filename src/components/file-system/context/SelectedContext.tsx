import React, { createContext, useContext, useState, ReactNode } from "react";
import { FileType, FolderType } from "../types";

type SelectedContextType = {
  selected: (FileType | FolderType)[] | null;
  setSelected: React.Dispatch<
    React.SetStateAction<(FileType | FolderType)[] | null>
  >;
};

const SelectedContext = createContext<SelectedContextType | undefined>(
  undefined
);

export const SelectedProvider = ({ children }: { children: ReactNode }) => {
  const [selected, setSelected] = useState<(FileType | FolderType)[] | null>(
    null
  );

  console.log(selected);

  return (
    <SelectedContext.Provider value={{ selected, setSelected }}>
      {children}
    </SelectedContext.Provider>
  );
};

export const useSelected = () => {
  const context = useContext(SelectedContext);
  if (!context) {
    throw new Error("useSelected must be used within a SelectedProvider");
  }
  return context;
};
