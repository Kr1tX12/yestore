import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useState } from "react";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { renameFile } from "@/lib/actions/files.actions";
import { usePathname } from "next/navigation";
import { getFileExtension, removeExtensionFromFile } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { FileType } from "../../../../types";

const FileRenameDialog = ({
  isOpen,
  setOpen,
  file,
}: {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  file: FileType;
}) => {
  const [fileName, setFileName] = useState(removeExtensionFromFile(file.name));
  const [fileExtension, setFileExtension] = useState(
    getFileExtension(file.name)
  );
  const [isLoading, setLoading] = useState(false);
  const pathname = usePathname();

  const close = () => {
    setOpen(false);
    setFileName(file.name);
  };

  const submit = async () => {
    setLoading(true);
    const result = await renameFile({
      fileId: file.id,
      name: fileName,
      extension: fileExtension,
      path: pathname,
    });

    if (result) close();

    setLoading(false);
  };
  return (
    <Dialog onOpenChange={(value) => setOpen(value)} open={isOpen}>
      <DialogContent className="bg-card">
        <DialogHeader>
          <DialogTitle>Переименовать файл</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2">
          <div className="flex-1 grid w-full max-w-sm items-center gap-1.5">
            <Label className="ml-1 text-zinc-300">Имя файла:</Label>
            <Input
              
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder={removeExtensionFromFile(file.name)}
            />
          </div>
          <div className="w-32 grid max-w-sm items-center gap-1.5">
            <Label className="ml-1 text-zinc-300">Расширение:</Label>
            <Input
              value={fileExtension}
              onChange={(e) => setFileExtension(e.target.value)}
              placeholder={getFileExtension(file.name)}
            />
          </div>
        </div>
        <DialogFooter className="flex justify-center">
          <Button className="w-full" disabled={isLoading} onClick={submit}>
            {isLoading && <Loader2 className="animate-spin" />}
            Подтвердить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FileRenameDialog;
