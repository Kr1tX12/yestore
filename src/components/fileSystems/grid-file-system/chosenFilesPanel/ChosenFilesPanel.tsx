"use client";

import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { DownloadIcon, Share2Icon, Trash2Icon } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useSelected } from "../../providers/SelectedContext";
import { FileType, FolderType } from "../../types";
import { getIconForFile, getIconForFolder, isFolder } from "../../utils";

const ChosenFilesPanel = () => {
  const [mounted, setMounted] = useState(false);
  const { selected, setSelected } = useSelected();

  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    console.log(selected);
    if (selected && selected.length > 0) {
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
  }, [selected]);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div
      ref={panelRef}
      className="fixed bottom-0 right-0 left-0 h-20 bg-zinc-950 mx-1 rounded-t-xl z-20 border border-zinc-900 flex justify-evenly translate-y-20"
    >
      <div className="max-w-6xl h-full flex gap-1 flex-col justify-center">
        <span className="text-xs text-zinc-400">
          Выбрано элементов: {selected?.length}
        </span>
        <div className="flex gap-3">
          {selected && selected?.length > 0 && selected?.length < 5 ? (
            selected.map((item) => <PanelItem item={item} />)
          ) : (
            <div>Много файлов</div>
          )}
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <Button size="sm">
          <DownloadIcon />
          <div className="flex flex-col">
            <span className="leading-[14px]">Скачать всё</span>
            <span className="text-[8px] text-zinc-700 leading-[8px]">
              10 МБ
            </span>
          </div>
        </Button>
        <Button size="sm">
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
  const FileIcon = getIconForFile(file);
  console.log("fileRender");
  return (
    <div className="flex items-center">
      <FileIcon className="size-8" strokeWidth="1.5" />
      <div className="flex flex-col">
        <span className="text-sm font-bold">
          {file.name}.{file.extension}
        </span>
        <span className="text-[9px] text-zinc-400">
          Изменён <span className="text-zinc-50">10.01.2023</span>
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
