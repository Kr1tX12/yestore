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
import FilePreviewDialog from "../../file-preview-dialog";
import { useState } from "react";

/**
 * Компонент для одного файла (показывает имя, иконку, меню и выбор).
 */
const GridFile = ({ file }: { file: FileType }) => {
  const { singleSelected, setSingleSelected } = useSingleSelected();
  const { selected, setSelected } = useSelected();
  const { files } = useFiles();
  const [openFilePreview, setOpenFilePreview] = useState(false);
  const isSingleSelected: boolean = singleSelected === file;
  const isSelectionEnabled = selected !== null;
  const isSelected = selected ? selected.includes(file) : false;

  const selectSingle = ({
    value = "auto",
    isShift = false,
  }: {
    value?: boolean | "auto";
    isShift: boolean;
  }) => {
    if (isShift && singleSelected) {
      setSelected([singleSelected]);
      setSingleSelected(null);
      select({ isShift: true });
    } else {
      if (value === "auto") {
        setSingleSelected(isSingleSelected ? null : file);
      } else {
        setSingleSelected(value ? file : null);
      }
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

    if (isShift && selected.length > 0) {
      if (value) {
        if (isSelected) return;
        const lastSelectedFile = selected[selected.length - 1];
        const lastSelectedFileIndex = files.contents.findIndex(
          (item) => item.id === lastSelectedFile.id
        );
        const thisFileIndex = files.contents.findIndex(
          (item) => item.id === file.id
        );

        if (lastSelectedFileIndex === -1 || thisFileIndex === -1) return;

        const filesToSelect = files.contents
          .slice(
            lastSelectedFileIndex < thisFileIndex
              ? lastSelectedFileIndex
              : thisFileIndex,
            thisFileIndex < lastSelectedFileIndex
              ? lastSelectedFileIndex + 1
              : thisFileIndex + 1
          )
          .filter((item) => selected.some((selItem) => item.id !== selItem.id));

        if (!filesToSelect) return;

        setSelected((prev) => {
          if (!prev) return prev;
          return [...prev, ...filesToSelect];
        });
      } else {
        if (!isSelected) return;

        const lastSelectedFile = selected[selected.length - 1];
        const lastSelectedFileIndex = files.contents.findIndex(
          (item) => item.id === lastSelectedFile.id
        );
        const thisFileIndex = files.contents.findIndex(
          (item) => item.id === file.id
        );

        if (lastSelectedFileIndex === -1 || thisFileIndex === -1) return;

        const filesToDeselect = files.contents
          .slice(
            lastSelectedFileIndex < thisFileIndex
              ? lastSelectedFileIndex
              : thisFileIndex,
            thisFileIndex < lastSelectedFileIndex
              ? lastSelectedFileIndex + 1
              : thisFileIndex + 1
          )
          .filter((item) => selected.some((selItem) => item.id === selItem.id));

        if (!filesToDeselect) return;

        setSelected((prev) => {
          if (!prev) return prev;
          return prev.filter((item) =>
            filesToDeselect.some((deselItem) => item.id === deselItem.id)
          );
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

  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(event);

    if (isSelectionEnabled) {
      select({ isShift: event.shiftKey });
    } else {
      if (singleSelected === file) {
        open();
      } else {
        selectSingle({ isShift: event.shiftKey });
      }
    }
  };

  const open = () => {
    setOpenFilePreview(true);
  };
  const type = getFileType(file.name);
  const extension = getFileExtension(file.name);

  return (
    <>
      <ContextMenu
        onOpenChange={() => selectSingle({ value: true, isShift: false })}
      >
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
      <FilePreviewDialog open={openFilePreview} setOpen={setOpenFilePreview} file={file} />
    </>
  );
};

export default GridFile;
