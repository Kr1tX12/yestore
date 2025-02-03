"use client";

import {
  convertFileSize,
  formatDateTime,
  getFileExtension,
  getFileType,
} from "@/lib/utils";
import { Models } from "node-appwrite";
import Thumbnail from "@/components/ui/thumbnail";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { fileURLToPath } from "url";
import { useEffect, useState } from "react";
import { getUserById } from "@/lib/actions/user.actions";

const FilesTable = ({ table }: { table: Array<Models.Document> }) => {
  const router = useRouter();

  const handleFileClick = (file: Models.Document) => {
    router.push(`/dashboard/files?query=${file.name}`);
  };


  return (
    <ul className="flex flex-col gap-2">
      {table.map((file) => (
        <li className="flex justify-between" key={file.$id}>
          <div className="flex gap-2 items-center">
            <Thumbnail
              type={getFileType(file.name)}
              extension={getFileExtension(file.name)}
              url={file.url}
              size={200}
              className="size-10 rounded-sm"
            />
            <div className="flex flex-col">
              {file.name}
              <div className="flex gap-4 text-xs text-muted-foreground">
                <p>{formatDateTime(file.$updatedAt)}</p>
                <p>{convertFileSize(file.size)}</p>
              </div>
            </div>
          </div>
          <Button
            size="icon"
            variant="secondary"
            onClick={() => handleFileClick(file)}
          >
            <ChevronRight />
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default FilesTable;
