import { FileType } from "@/components/fileSystems/types";
import {
  convertToFileType,
  getIconForFile,
} from "@/components/fileSystems/utils";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { createPortal } from "react-dom";

const FileUploadingPanel = ({ files }: { files: File[] }) => {
  if (files.length <= 0) return;

  const progress = 50;

  return createPortal(
    <div className="fixed right-4 bottom-4 bg-card border border-border rounded-md px-6 py-2 flex flex-col gap-4 items-center w-80 h-80">
      <div className="w-full flex flex-col items-center">
        <p className="text-xs text-zinc-300">{progress}%</p>
        <Progress value={progress} />
      </div>

      <div className="w-full gap-1 flex flex-col items-center">
        <Separator />
        <h3 className="font-bold">Загружаемые файлы:</h3>
      </div>
      <ScrollArea>
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

const UploadingFile = ({ file }: { file: File }) => {
  const convertedFile = convertToFileType(file);
  const ThisFileIcon = getIconForFile(convertedFile);

  return (
    <li className="border border-border px-4 py-2 flex items-center gap-2 justify-between rounded-md w-full">
      <div className="flex gap-2 items-center">
        <ThisFileIcon className="size-4" />
        <p className="text-sm text-zinc-200 max-w-28 text-nowrap truncate">
          {convertedFile.name}.{convertedFile.extension}
        </p>
      </div>
      <div className="flex flex-col w-24 items-center">
        <Progress value={50} />
        <p className="text-[8px] text-zinc-400">125MB / 250MB</p>
      </div>
    </li>
  );
};

export default FileUploadingPanel;
