import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { FolderType } from "../types";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { getIconForFolder, getItemsFromFolder } from "../utils";
import clsx from "clsx";

const Folder = ({ folder, autoOpen = false }: { folder: FolderType, autoOpen?: boolean }) => {
  const [open, setOpen] = useState<boolean>(false);

  const FolderIcon = useMemo(() => {
    return getIconForFolder(folder);
  }, [folder]);

  useEffect(() => {
    setOpen(autoOpen);
  }, []);

  return (
    <li>
      <Collapsible open={open} onOpenChange={(value) => setOpen(value)}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full flex items-center gap-2 mb-1"
          >
            <div className="flex-1 flex gap-2 items-center">
              <FolderIcon />
              <span>{folder.name}</span>
              <ChevronRight
                className={clsx("transition-transform", open && "rotate-90")}
              />
            </div>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="border-l-zinc-800 border-l ml-5">
          <ul className="flex flex-col gap-1">{getItemsFromFolder(folder, autoOpen)}</ul>
        </CollapsibleContent>
      </Collapsible>
    </li>
  );
};

export default Folder;
