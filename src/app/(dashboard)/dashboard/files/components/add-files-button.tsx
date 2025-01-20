"use client";

import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import FileUploadingPanel from "./file-uploading-panel";

const AddFilesButton = ({
  ownerId,
  accountId,
  className,
}: {
  ownerId: string;
  accountId: string;
  className?: string;
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Button type="button" className="">
          <UploadIcon />
          Add files
        </Button>
      </div>
      <FileUploadingPanel files={files} />
    </>
  );
};

export default AddFilesButton;
