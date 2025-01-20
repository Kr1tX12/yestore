"use client";

import { FolderType } from "../types";
import { useSelected } from "./context/SelectedContext";
import { getItemsFromFolder } from "../utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import GridFolder from "./folder/GridFolder";
import { usePath } from "./context/PathContext";
import { useEffect } from "react";
import { useSingleSelected } from "./context/SingleSelectedContext";

type FileSystemProps = {
  rootFolder: FolderType;
  hideFirst: boolean;
  openFolders?: boolean;
  height?: number;
};

const GridFileSystem = ({
  rootFolder,
  hideFirst,
  openFolders = false,
  height = 300,
}: FileSystemProps) => {
  const { singleSelected, setSingleSelected } = useSingleSelected();
  const { path, setPath } = usePath();

  useEffect(() => {
    setSingleSelected(null);
  }, [path])

  useEffect(() => {
    setPath([rootFolder])
  }, [])
  const folderNow =
    path && path.length > 0 ? path[path.length - 1] : rootFolder;

  return (
    <ScrollArea>
      <ul className={"grid grid-cols-12 mx-8 gap-1"} style={{ height: height - 55 }}>
        {hideFirst ? (
          getItemsFromFolder(folderNow, openFolders, "grid")
        ) : (
          <GridFolder folder={folderNow} />
        )}
      </ul>
    </ScrollArea>
  );
};

export default GridFileSystem;
