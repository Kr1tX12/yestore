import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useState } from "react";
import Thumbnail from "@/components/ui/thumbnail";
import { convertFileSize, formatDateTime, getFileExtension, getFileType, removeExtensionFromFile } from "@/lib/utils";
import { FileType } from "../../../../types";

const FileInfoDialog = ({
  isOpen,
  setOpen,
  file,
}: {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  file: FileType;
}) => {
  return (
    <Dialog onOpenChange={(value) => setOpen(value)} open={isOpen}>
      <DialogContent className="bg-card">
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            <Thumbnail
              url={file.url}
              type={getFileType(file.name)}
              extension={getFileExtension(file.name)}
              size={200}
              className="size-9 rounded-sm"
            />
            <div className="flex flex-col gap-1">
              <p>{file.name}</p>
              <p className="text-zinc-400 text-xs font-normal">{formatDateTime(file.lastModified)}</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <ul>
            {[{
                name: "Название",
                value: removeExtensionFromFile(file.name),
            }, {
                name: "Расширение",
                value: getFileExtension(file.name),
            }, {
                name: "Тип",
                value: getFileType(file.name),
            }, {
                name: "Размер",
                value: convertFileSize(file.size),
            }, {
                name: "Изменён",
                value: formatDateTime(file.lastModified),
            }, {
                name: "Создатель",
                value: file.name,
            }].map((item) => (
                <li key={item.name} className="grid grid-cols-2 gap-2 items-center border-border">
                    <p className="text-md font-normal text-zinc-400">{item.name}:</p>
                    <p className="text-zinc-100 text-md font-medium">{item.value}</p>
                </li>
            ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default FileInfoDialog;
