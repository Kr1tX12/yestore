"use client";

import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import clsx from "clsx";
import { useSingleSelected } from "../../providers/SingleSelectedContext";
import { useSelected } from "../../providers/SelectedContext";
import Thumbnail from "@/components/ui/thumbnail";
import { getFileExtension, getFileType } from "@/lib/utils";
import FileMenuContent from "../../elementMenu/FileMenuContent";
import { FileType } from "../../../../../types";
import { useFiles } from "../../providers/files-provider";

/**
 * Компонент для одного файла (показывает имя, иконку, меню и выбор).
 */
const GridFile = ({ file }: { file: FileType }) => {
  const { singleSelected, setSingleSelected } = useSingleSelected();
  const { selected, setSelected } = useSelected();
  const { files } = useFiles();
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

  const select = ({
    value,
    isShift = false,
  }: {
    value?: boolean;
    isShift?: boolean;
  }) => {
    if (!isSelectionEnabled) return;
    if (value === undefined) {
      value = !isSelected;
    }
    if (isShift) {
      if (value) {
        if (isSelected) return;
        const lastSelectedIndex = selected.length - 1;

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
    } else {
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
    }
  };

  const onClick = (event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(isSelectionEnabled);
    if (isSelectionEnabled) {
      select(event.shiftKey);
    } else {
      selectSingle();
    }
  };
  const type = getFileType(file.name);
  const extension = getFileExtension(file.name);

  return (
    <ContextMenu onOpenChange={() => selectSingle(true)}>
      <ContextMenuTrigger asChild>
        <button
          onClick={(event) => onClick(event)}
          className={clsx(
            "size-36 hover:bg-accent/50 active:bg-accent transition-colors rounded-md p-2",
            (isSingleSelected || isSelected) &&
              "bg-primary hover:bg-primary/80 active:bg-primary/50"
          )}
        >
          <div className="flex flex-col items-center justify-center gap-1">
            <Thumbnail
              type={type}
              extension={extension ?? ""}
              url={file.url}
              size={250}
              className="size-24 rounded-sm"
            />
            <span className="text-xs text-stone-300 select-none text-nowrap truncate max-w-full">
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
