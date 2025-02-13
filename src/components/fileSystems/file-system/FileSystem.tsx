"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { CloudIcon, LayoutListIcon } from "lucide-react";
import Folder from "./folder/Folder";
import { useSelected } from "../providers/SelectedContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { getItemsFromFolder } from "@/lib/utils";
import { FolderType } from "../../../../types";

type FileSystemProps = {
  rootFolder: FolderType;
  hideFirst: boolean;
  openFolders?: boolean;
  height?: number;
  type?: "list" | "grid";
};

const FileSystem = ({
  rootFolder,
  hideFirst,
  openFolders = false,
  height = 300,
  type = "list",
}: FileSystemProps) => {
  
  return (
    <ScrollArea>
      <ul
        className={
          type === "list" ? `flex flex-col gap-1 p-6` : "grid grid-cols-12 mx-8"
        }
        style={{ height: height - 55 }}
      >
        {hideFirst
          ? getItemsFromFolder(rootFolder, openFolders, type)
          : <Folder autoOpen={openFolders} folder={rootFolder} />}
      </ul>
    </ScrollArea>
  );
};

export const DefaultCardWrapper = ({
  className,
  height,
  title,
  children,
}: {
  className?: string;
  height?: number;
  title: string;
  children: React.ReactNode;
}) => {
  const { selected, setSelected } = useSelected();

  return (
    <Card
      className={`backdrop-blur-sm bg-transparent ${className}`}
      style={{ height: height }}
    >
      <CardHeader className="py-2">
        <CardTitle className="flex items-center justify-between ml-2">
          <div className="flex items-center gap-1">
            <CloudIcon fill="white" />
            <span>{title}</span>
          </div>
          {/* Тумблер для включения/выключения режима Select */}
          <Toggle
            variant="default"
            pressed={selected !== null}
            onPressedChange={(value) => setSelected(value ? [] : null)}
          >
            <LayoutListIcon />
          </Toggle>
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-0">{children}</CardContent>
    </Card>
  );
};

export default FileSystem;
