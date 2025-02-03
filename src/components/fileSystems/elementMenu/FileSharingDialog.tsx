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
import { Loader2, PlusIcon, TrashIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Label } from "@/components/ui/label";
import { FileType } from "../../../../types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { updateFileUsers } from "@/lib/actions/files.actions";
import Thumbnail from "@/components/ui/thumbnail";
import {
  convertFileSize,
  formatDateTime,
  getFileExtension,
  getFileType,
} from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { title } from "process";

const FileSharingDialog = ({
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
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState<string[]>(file.users);
  const toast = useToast();

  const close = () => {
    setEmail("");
    setOpen(false);
  };

  const addNewEmail = () => {
    if (email.trim() === "") {
      toast.toast({
        title: "Введите электронную почту",
        variant: "destructive"
      });
      return;
    }
    setEmails((prev) => [...prev, email]);
    setEmail("");
  };

  const submit = async () => {
    setLoading(true);

    const success = await updateFileUsers({
      fileId: file.id,
      emails: emails,
      path: pathname,
    });
    if (success) close();

    setLoading(false);
  };

  const handleRemoveUser = (index: number) => {
    setEmails((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <Dialog onOpenChange={(value) => setOpen(value)} open={isOpen}>
      <DialogContent className="bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Thumbnail
              type={getFileType(file.name)}
              extension={getFileExtension(file.name)}
              url={file.url}
              size={200}
              className="size-10 rounded-sm"
            />
            <div className="flex flex-col gap-1">
              {file.name}
              <div className="flex gap-4 text-muted-foreground text-xs font-normal">
                <p>{formatDateTime(file.lastModified)}</p>
                <p>{convertFileSize(file.size)}</p>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-end gap-2">
          <div className="flex-1 grid w-full items-center gap-1.5">
            <Label className="ml-1 text-zinc-300">Электронная почта:</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={"bobrikov228@gmail.com"}
            />
          </div>
          <Button size="icon" disabled={isLoading} onClick={addNewEmail}>
            <PlusIcon />
          </Button>
        </div>

        <p className="text-zinc-300">
          Всего:{" "}
          <span className="text-zinc-50 font-semibold">{emails.length}</span>
        </p>
        <ScrollArea className="max-h-96">
          <ul className="w-full pr-3">
            {emails.map((item, index) => (
              <li key={index} className="flex items-center justify-between">
                <p>
                  <span className="font-bold">{index + 1}.</span>{" "}
                  <span className="text-zinc-300">{item}</span>
                </p>
                <Button
                  onClick={() => handleRemoveUser(index)}
                  variant="ghost"
                  size="icon"
                >
                  <TrashIcon />
                </Button>
              </li>
            ))}
          </ul>
        </ScrollArea>

        <DialogFooter className="flex flex-col gap-2">
          <Button className="w-full" disabled={isLoading} onClick={submit}>
            {isLoading && <Loader2 className="animate-spin" />}
            Подтвердить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FileSharingDialog;
