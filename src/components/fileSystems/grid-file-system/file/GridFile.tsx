"use client";

import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import clsx from "clsx";
import { useMemo, useRef } from "react";
import { FileType } from "../../types";
import { getIconForFile } from "../../utils";
import FileMenuContent from "../elementMenu/FileMenuContent";
import { useSingleSelected } from "../context/SingleSelectedContext";
import { useSelected } from "../context/SelectedContext";

/**
 * Компонент для одного файла (показывает имя, иконку, меню и выбор).
 */
const GridFile = ({ file }: { file: FileType }) => {
  const { singleSelected, setSingleSelected } = useSingleSelected();
  const { selected, setSelected } = useSelected();
  const isSingleSelected: boolean = singleSelected === file;
  const isSelectionEnabled = selected !== null;
  const isSelected = selected ? selected.includes(file) : false;

  const selectSingle = (value: boolean | "auto" = "auto") => {
    if (value === "auto") {
      setSingleSelected(isSingleSelected ? null : file);
    } else {
      setSingleSelected(value ? file : null);
    }
  };

  const select = (value?: boolean) => {
    if (!isSelectionEnabled) return;
    if (value === undefined) {
      value = !isSelected;
    }

    if (value) {
      if (isSelected) return;

      setSelected((prev) => {
        if (!prev) return prev;
        return [...prev, file];
      });
    } else {
      if (!isSelected) return;

      setSelected((prev) => {
        if (!prev) return prev;
        return prev.filter((item) => item.id !== file.id);
      });
    }
  };

  const onClick = () => {
    console.log(isSelectionEnabled);
    if (isSelectionEnabled) {
      select();
    } else {
      selectSingle();
    }
  };

  const FileIcon = useMemo(() => {
    return getIconForFile(file);
  }, [file]);

  return (
    <ContextMenu onOpenChange={() => selectSingle(true)}>
      <ContextMenuTrigger asChild>
        <button
          onClick={onClick}
          className={clsx(
            "size-20 hover:bg-accent/50 active:bg-accent transition-colors rounded-md",
            (isSingleSelected || isSelected) &&
              "bg-primary hover:bg-primary/80 active:bg-primary/50"
          )}
        >
          <div className="flex flex-col items-center justify-center">
            <FileIcon className="size-10" />
            <span className="text-xs text-stone-300 select-none">
              {file.name}
            </span>
          </div>
        </button>
      </ContextMenuTrigger>
      <FileMenuContent isContextMenu={true} file={file} />
    </ContextMenu>
  );
};

export default GridFile;
