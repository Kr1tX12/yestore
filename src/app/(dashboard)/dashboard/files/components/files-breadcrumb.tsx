"use client";

import { usePath } from "@/components/fileSystems/grid-file-system/context/PathContext";
import { FolderType } from "@/components/fileSystems/types";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import clsx from "clsx";
import { HomeIcon } from "lucide-react";
import React, { MouseEventHandler } from "react";

const FilesBreadcrumb = ({ className }: { className?: string }) => {
  const { path, setPath } = usePath();
  console.log(path)

  if (path && path.length <= 1) return null;

  const onClick = (folder: FolderType) => {
    if (!path) return;

    const index = path?.indexOf(folder);
    const newPath = path.slice(0, index + 1);
    setPath(newPath);
  };


  return (
    <Breadcrumb className={clsx("", className)}>
      <BreadcrumbList>
        {path?.map((item, index) => {
          const isLast = path.length - 1 === index;

          return (
            <React.Fragment key={item.id}>
              <BreadcrumbFile
                onClick={() => onClick(item)}
                folder={item}
                active={isLast}
              />
              <BreadcrumbSeparator />
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const BreadcrumbFile = ({
  folder,
  active,
  onClick,
}: {
  folder: FolderType;
  active: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <BreadcrumbItem>
      <button
        onClick={onClick}
        className={clsx("select-none", active && "text-white")}
      >
        {folder.name === "Home" ? <HomeIcon className="size-4" /> : folder.name}
      </button>
    </BreadcrumbItem>
  );
};

export default FilesBreadcrumb;
