import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useState } from "react";
import { FileType } from "../../../../types";
import { Button } from "@/components/ui/button";
import { deleteFile } from "@/lib/actions/files.actions";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

const FileDeleteDialog = ({
  isOpen,
  setOpen,
  file,
}: {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  file: FileType;
}) => {
  const [isLoading, setLoading] = useState(false);

  const pathname = usePathname();
  const close = () => {
    setOpen(false);
  }

  const confirmDeletion = async () => {
    setLoading(true);
    
    const deletedFile = await deleteFile({
      fileId: file.id,
      bucketFileId: file.bucketFileId,
      path: pathname,
    });

    if (deletedFile.status === 'success') {
      close();
    }

    setLoading(false);
  };
  return (
    <Dialog onOpenChange={(value) => setOpen(value)} open={isOpen}>
      <DialogContent className="bg-card">
        <DialogHeader>
          <DialogTitle className="text-center">
            Вы действительно хотите удалить файл?
          </DialogTitle>
          <DialogDescription className="text-center">
            Вы не сможете отменить это действие
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={confirmDeletion}
            className="w-full"
            variant="destructive"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="animate-spin" />}
            Удалить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FileDeleteDialog;
