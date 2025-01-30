"use client";

import {
  Breadcrumb,
  BreadcrumbList, BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import clsx from "clsx";
import React from "react";
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
