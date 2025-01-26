import { MAX_FILE_SIZE } from "@/constants";
import { getWordEnding } from "@/lib/utils";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useUploadingFiles } from "../../providers/uploading-files-provider";
import { useToast } from "@/hooks/use-toast";
import { getBigFilesErrorToastParams } from "./big-files-toast-data";
import { uploadFile } from "@/lib/actions/files.actions";
import { usePathname } from "next/navigation";

export const useAddFilesButton = (ownerId: string | undefined, accountId: string) => {
  const path = usePathname();
  const { files, setFiles } = useUploadingFiles();
  const { toast } = useToast();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!accountId || !ownerId) {
        toast({
          title: "Вы не авторизованы",
          variant: "destructive",
          description: "Авторизуйтесь, чтобы загрузить файлы",
        });
        return;
      }
      setFiles(acceptedFiles);

      const bigFiles: File[] = [];
      const uploadingPromises = acceptedFiles.map((file) => {
        if (file.size > MAX_FILE_SIZE) {
          setFiles((prev) => prev.filter((f) => f.name !== file.name));
          bigFiles.push(file);
        } else {
          return uploadFile({ file, ownerId, accountId, path }).then(
            (uploadedFile) => {
              if (uploadedFile) {
                setFiles((prev) => prev.filter((f) => f.name !== file.name));
              }
            }
          );
        }
      });

      if (bigFiles.length > 0) {
        toast(getBigFilesErrorToastParams({ bigFiles }));
      }
      await Promise.all(uploadingPromises);
    },
    [ownerId, accountId, path]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return { getRootProps, getInputProps, isDragActive, files };
};
