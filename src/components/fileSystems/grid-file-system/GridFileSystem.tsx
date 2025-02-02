"use client";

import GridFolder from "./folder/GridFolder";
import { usePath } from "../providers/PathContext";
import { Ref, useEffect, useRef } from "react";
import { useSingleSelected } from "../providers/SingleSelectedContext";
import { getItemsFromFolder } from "@/lib/utils";
import ChosenFilesPanel from "./chosenFilesPanel/ChosenFilesPanel";
import { FolderType } from "../../../../types";
import { useFiles } from "../providers/files-provider";

type FileSystemProps = {
  hideFirst: boolean;
  openFolders?: boolean;
  height?: number;
};

const GridFileSystem = ({
  hideFirst,
  openFolders = false,
  height = 300,
}: FileSystemProps) => {
  const { setSingleSelected } = useSingleSelected();
  const { files } = useFiles();
  const { path, setPath } = usePath();

  useEffect(() => {
    setSingleSelected(null);
  }, [path]);

  useEffect(() => {
    setPath([files]);
  }, []);
  const folderNow = path && path.length > 0 ? path[path.length - 1] : files;

  console.log("ура ура новые файлы");
  console.log(files);

  return (
    <div
      className="size-full"
      onClick={(e) => {
        if (e.target === e.currentTarget) setSingleSelected(null);
      }}
    >
      <ul
        className={
          "grid grid-cols-[repeat(10,minmax(0,1fr))] max-sm:grid-cols-[repeat(3,minmax(0,1fr))] max-md:grid-cols-[repeat(4,minmax(0,1fr))] max-lg:grid-cols-[repeat(3,minmax(0,1fr))] max-xl:grid-cols-[repeat(4,minmax(0,1fr))] max-2xl:grid-cols-[repeat(6,minmax(0,1fr))] max-3xl:grid-cols-[repeat(6,minmax(0,1fr))] mx-8 gap-1"
        }
      >
        {hideFirst ? (
          getItemsFromFolder(folderNow, openFolders, "grid")
        ) : (
          <GridFolder folder={folderNow} />
        )}
      </ul>
      <ChosenFilesPanel />
    </div>
  );
};

export default GridFileSystem;
