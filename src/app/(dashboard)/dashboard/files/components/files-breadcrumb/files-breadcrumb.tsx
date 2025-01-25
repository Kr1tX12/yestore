"use client";

import { usePath } from "@/components/fileSystems/providers/PathContext";
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
import { BreadcrumbFile } from "./breadcrumb-file";
import { useFilesBreadcrumb } from "./use-files-breadcrumb";

const FilesBreadcrumb = ({ className }: { className?: string }) => {
  const { onClick, path } = useFilesBreadcrumb();
  
  if (path && path.length <= 1) return null;

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

export default FilesBreadcrumb;
