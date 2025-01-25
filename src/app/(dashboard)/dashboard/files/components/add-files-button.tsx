"use client";

import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import FileUploadingPanel from "./file-uploading-panel";
import { useFiles } from "./providers/files-provider";
import { useUploadingFiles } from "./providers/uploading-files-provider";

const AddFilesButton = ({
  ownerId,
  accountId,
  className,
}: {
  ownerId: string;
  accountId: string;
  className?: string;
}) => {
  const { files, setFiles } = useUploadingFiles();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Button type="button" className="rose-shadow">
          <UploadIcon />
          Add files
        </Button>
      </div>
      <FileUploadingPanel files={files} />
    </>
  );
};

export default AddFilesButton;
