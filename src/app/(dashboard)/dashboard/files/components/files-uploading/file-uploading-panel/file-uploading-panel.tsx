import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { createPortal } from "react-dom";
import { UploadingFile } from "./uploading-file/uploading-file";

const FileUploadingPanel = ({ files }: { files: File[] }) => {
  if (files.length <= 0) return;

  const progress = 50;

  return createPortal(
    <div className="fixed right-4 bottom-4 bg-card border border-border rounded-md px-6 py-2 flex flex-col gap-4 items-center w-96 h-80">
      <div className="w-full flex flex-col items-center">
        <p className="text-xs text-zinc-300">{progress}%</p>
        <Progress value={progress} />
      </div>

      <div className="w-full gap-1 flex flex-col items-center">
        <Separator />
        <h3 className="font-bold">Загружаемые файлы:</h3>
      </div>
      <ScrollArea className="w-full">
        <ul className="flex-1 flex flex-col w-full gap-1">
          {files.map((file, index) => (
            <UploadingFile key={`${file.name}-${index}`} file={file} />
          ))}
        </ul>
      </ScrollArea>
    </div>,
    document.body
  );
};

export default FileUploadingPanel;
