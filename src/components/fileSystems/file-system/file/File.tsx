"use client";

import { Button } from "@/components/ui/button";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import clsx from "clsx";
import { useMemo, useRef } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { FileType } from "../../types";
import { getIconForFile } from "../../utils";
import FileMenuContent from "../elementMenu/FileMenuContent";
import { useFileLogic } from "./useFileLogic";
import { useSingleSelected } from "../../providers/SingleSelectedContext";

/**
 * Компонент для одного файла (показывает имя, иконку, меню и выбор).
 */
const File = ({ file }: { file: FileType }) => {
  const checkboxRef = useRef<HTMLButtonElement>(null);

  // Логика выбора/анимации вынесена в хук
  const { isChecked, setIsChecked, handleUserCheck } = useFileLogic(
    file,
    checkboxRef
  );

  // Пользователь кликнул по чекбоксу (или нажал пробел)
  const onCheckedChange = (checked: boolean | "indeterminate") => {
    // Ставим локально
    setIsChecked(!!checked);
    // Ставим глобально
    handleUserCheck(!!checked);
  };

  const { singleSelected, setSingleSelected } = useSingleSelected();
  const isSingleSelected: boolean = singleSelected === file;

  const selectSingle = (value: boolean | "auto" = "auto") => {
    if (value === "auto") {
      setSingleSelected(isSingleSelected ? null : file);
    } else {
      setSingleSelected(value ? file : null);
    }
  };

  const FileIcon = useMemo(() => {
    return getIconForFile(file.extension);
  }, [file]);

  return (
    <li className="flex w-full items-center ml-2">
      {/* Чекбокс, который появляется / скрывается с анимацией */}
      <Checkbox
        className={clsx("size-0 opacity-0")}
        checked={isChecked}
        onCheckedChange={onCheckedChange}
        ref={checkboxRef}
      />

      <div className="flex gap-2 items-center w-full">
        <ContextMenu onOpenChange={() => selectSingle(true)}>
          <ContextMenuTrigger asChild>
            <Button
              variant={isChecked || isSingleSelected ? "default" : "ghost"}
              className="flex w-full px-2"
              onClick={() => selectSingle()}
            >
              <FileIcon />
              <span className="flex-1 text-left">
                {file.name}.{file.extension}
              </span>
            </Button>
          </ContextMenuTrigger>
          <FileMenuContent isContextMenu={true} file={file} />
        </ContextMenu>

        <DropdownMenu onOpenChange={() => selectSingle(true)}>
          <DropdownMenuTrigger asChild>
            <Button
              variant={isChecked || isSingleSelected ? "default" : "ghost"}
              className="p-2"
            >
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <FileMenuContent isContextMenu={false} file={file} />
        </DropdownMenu>
      </div>
    </li>
  );
};

export default File;
