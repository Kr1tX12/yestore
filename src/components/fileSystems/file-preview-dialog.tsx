import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FileType } from "../../../types";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import Thumbnail from "../ui/thumbnail";
import {
  constructDownloadUrl,
  convertFileSize,
  formatDateTime,
  getFileExtension,
  getFileType,
} from "@/lib/utils";
import { Button } from "../ui/button";
import { ChevronRight, DownloadIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { getUserById } from "@/lib/actions/user.actions";
import { Models } from "node-appwrite";

const FilePreviewDialog = ({
  file,
  open,
  setOpen,
}: {
  file: FileType;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [owner, setOwner] = useState();

  useEffect(() => {
    const fetchOwner = async () => {
      const owner = await getUserById({ id: file.ownerId });
      setOwner(owner);
    };

    fetchOwner();
  }, []);
  return (
    <Dialog open={open} onOpenChange={(newOpen) => setOpen(newOpen)}>
      <DialogContent className="bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Thumbnail
              url={file.url}
              size={60}
              className="size-10 object-cover rounded-sm"
              extension={getFileExtension(file.name)}
              type={getFileType(file.name)}
            />
            <div>
              <p>{file.name}</p>
              <div className="flex gap-4 items-center text-zinc-300 font-normal text-xs">
                <p>{convertFileSize(file.size)}</p>
                <p>{formatDateTime(file.lastModified)}</p>
                <p>{owner ? (owner as Models.Document).fullname : <Loader2 className="animate-spin" />}</p>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="relative flex-1 flex items-center justify-center">
          {getFileType(file.name) === "image" ? (
            <img
              src={file.url}
              alt={file.name}
              className="max-w-full max-h-[70vh] object-contain rounded-sm"
            />
          ) : getFileType(file.name) === "video" ? (
            <video
              src={file.url}
              controls
              className="max-w-full max-h-[70vh]"
            />
          ) : getFileType(file.name) === "audio" ? (
            <audio controls className="w-full" src={file.url} />
          ) : (
            <iframe src={file.url} className="w-full h-[70vh] border-none" />
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" size="sm" asChild>
            <Link href={constructDownloadUrl(file.bucketFileId)}>
              Скачать <DownloadIcon />
            </Link>
          </Button>
          <Button variant="secondary" size="sm" asChild>
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              Посмотреть полностью <ChevronRight />
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilePreviewDialog;
