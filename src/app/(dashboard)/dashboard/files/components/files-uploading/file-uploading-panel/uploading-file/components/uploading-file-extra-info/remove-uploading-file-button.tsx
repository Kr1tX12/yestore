import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useUploadingFiles } from "../../../../../providers/uploading-files-provider";

export const RemoveUploadingFileButton = ({ file }: { file: File }) => {
  const { setFiles } = useUploadingFiles();

  const removeFile = () => {
    setFiles((prev) => {
      return prev.filter((item) => item !== file);
    });
  };

  return (
    <Button onClick={removeFile} size="icon" variant="ghost">
      <X />
    </Button>
  );
};
