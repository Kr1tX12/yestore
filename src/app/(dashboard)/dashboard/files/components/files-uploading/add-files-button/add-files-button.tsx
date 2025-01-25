"use client";

import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import FileUploadingPanel from "../file-uploading-panel/file-uploading-panel";
import { useAddFilesButton } from "./useAddFilesButton";

const AddFilesButton = ({
  ownerId,
  accountId,
  className,
}: {
  ownerId: string;
  accountId: string;
  className?: string;
}) => {
  const { getRootProps, getInputProps, files } = useAddFilesButton();

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
