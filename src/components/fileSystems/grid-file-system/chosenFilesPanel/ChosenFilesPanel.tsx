"use client";

import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { DownloadIcon, Share2Icon, Trash2Icon } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useSelected } from "../../providers/SelectedContext";
import {
  convertFileSize,
  formatDateTime,
  getFileExtension,
  getFileType,
  getIconForFolder,
  getSizeOfFolder,
  isFolder
} from "@/lib/utils";
import Thumbnail from "@/components/ui/thumbnail";
import { useSingleSelected } from "../../providers/SingleSelectedContext";
import { FileType, FolderType } from "../../../../../types";

const ChosenFilesPanel = () => {
  const [mounted, setMounted] = useState(false);
  const { selected } = useSelected();
  const { singleSelected } = useSingleSelected();

  const items = selected && selected.length > 0 ? selected : singleSelected === null ? null : [singleSelected]
  
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (items && items.length > 0) {
      gsap.to(panelRef.current, {
        translateY: 0,
        duration: 0.2,
      });
    } else {
      gsap.to(panelRef.current, {
        translateY: 80,
        duration: 0.2,
      });
    }
  }, [selected, singleSelected]);

  if (!mounted) {
    return null;
  }

  const totalSize = items?.reduce((acc, item) => acc + (isFolder(item) ? getSizeOfFolder(item) : item.size), 0);

  return createPortal(
    <div
      ref={panelRef}
      className="fixed bottom-0 right-0 left-0 h-20 bg-zinc-950 mx-1 rounded-t-xl z-[200] border border-zinc-900 flex justify-evenly translate-y-20"
    >
      <div className="max-w-6xl h-full flex gap-1 flex-col justify-center">
        <span className="text-xs text-zinc-400">
          Выбрано элементов: {items?.length}
        </span>
        <div className="flex gap-3">
          {items && items.length > 0 && items.length < 5 ? (
            items.map((item) => <PanelItem key={item.id} item={item} />)
          ) : (
            <div>Много файлов</div>
          )}
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <Button size="sm" variant="secondary">
          <DownloadIcon />
          <div className="flex flex-col">
            <span className="leading-[14px]">Скачать всё</span>
            <span className="text-[8px] text-zinc-200 leading-[8px]">
              {convertFileSize(totalSize ?? 0, 2)}
            </span>
          </div>
        </Button>
        <Button variant="secondary" size="sm">
          <Share2Icon />
          Поделиться
        </Button>
        <Button size="sm" variant="destructive">
          <Trash2Icon />
          Удалить
        </Button>
      </div>
    </div>,
    document.body
  );
};

const PanelItem = ({ item }: { item: FileType | FolderType }) => {
  const element = isFolder(item) ? (
    <Folder folder={item} />
  ) : (
    <File file={item} />
  );
  return element;
};

const File = memo(({ file }: { file: FileType }) => {
  console.log(file);
  return (
    <div className="flex gap-1 items-center">
      <Thumbnail
        type={getFileType(file.name)}
        extension={getFileExtension(file.name)}
        url={file.url}
        size={200}
        className="size-8 rounded-sm"
      />
      <div className="flex flex-col">
        <span className="text-sm font-bold">
          {file.name}
        </span>
        <span className="text-[9px] text-zinc-400">
          Изменён <span className="text-zinc-50">{formatDateTime(file.lastModified)}</span>
        </span>
      </div>
    </div>
  );
});

const Folder = memo(({ folder }: { folder: FolderType }) => {
  const FolderIcon = getIconForFolder(folder);
  return (
    <div className="flex items-center">
      <FolderIcon className="size-10" strokeWidth="1.5" />
      <div className="flex flex-col">
        <span className="text-lg font-bold">gameplay.mp4</span>
        <span className="text-xs text-zinc-400">
          Изменён <span className="text-zinc-50">10.01.2023</span>
        </span>
      </div>
    </div>
  );
});

export default ChosenFilesPanel;
