import React from "react";
import { SelectedProvider } from "./SelectedContext";
import { SingleSelectedProvider } from "./SingleSelectedContext";
import { PathProvider } from "./PathContext";

const GridFileSystemProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SelectedProvider>
      <SingleSelectedProvider>
        <PathProvider>{children}</PathProvider>
      </SingleSelectedProvider>
    </SelectedProvider>
  );
};

export default GridFileSystemProvider;
