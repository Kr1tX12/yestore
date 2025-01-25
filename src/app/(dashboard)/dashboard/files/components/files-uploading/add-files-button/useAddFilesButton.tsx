import { MAX_FILE_SIZE } from "@/constants";
import { getWordEnding } from "@/lib/utils";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useUploadingFiles } from "../../providers/uploading-files-provider";
import { useToast } from "@/hooks/use-toast";

export const useAddFilesButton = () => {
  const { files, setFiles } = useUploadingFiles();
  const { toast } = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);

    const bigFiles: File[] = [];
    const uploadingPromises = acceptedFiles.map((file) => {
      if (file.size > MAX_FILE_SIZE) {
        setFiles((prev) => prev.filter((f) => f.name !== file.name));
      }

      bigFiles.push(file);
    });

    if (bigFiles.length > 0) {
      toast({
        variant: "destructive",
        
        title: `${bigFiles.length} ${getWordEnding(bigFiles.length, ["файл", "файла", "файлов"])} не были загружены`,
        description:
          bigFiles.length === 1 ? (
            <p>
              <span className="text-primary">{bigFiles[0].name}</span> слишком
              большой. Максимальный размер файла - 50 МБ
            </p>
          ) : (
            <p>
              <span className="text-destructive-foreground/70">
                {bigFiles[0].name} {bigFiles.length === 2 ? "И" : ","}{" "}
                {bigFiles[1].name}
              </span>{" "}
              {bigFiles.length === 2
                ? " слишком большие."
                : ` и ещё ${bigFiles.length - 2} ${getWordEnding(bigFiles.length - 2, ["файл", "файла", "файлов"])} слишком большие`}
              . <br /> Максимальный размер 1 файла - 50МБ
            </p>
          ),
      });
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


  return { getRootProps, getInputProps, isDragActive, files };
};
