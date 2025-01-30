"use client";
import {
  ContextMenuContent,
  ContextMenuLabel,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  FilesIcon,
  DownloadIcon,
  InfoIcon,
  PenLineIcon,
  Trash2Icon,
  Share2Icon,
} from "lucide-react";
import AdvancedMenuItem from "./AdvancedMenuItem";
import { constructDownloadUrl, getWordEnding } from "@/lib/utils";
import { useSelected } from "../providers/SelectedContext";
import { useSingleSelected } from "../providers/SingleSelectedContext";
import { useRouter } from "next/navigation";
import { memo, useEffect, useState } from "react";
import FileRenameDialog from "./FileRenameDialog";
import FileDeleteDialog from "./FileDeleteDialog";
import FileInfoDialog from "./FileInfoDialog";
import { FileType, FolderType } from "../../../../types";
import FileSharingDialog from "./FileSharingDialog";

type DialogType = "rename" | "delete" | "info" | "share" | "no";

const FileMenuContent = memo(
  ({ isContextMenu, file }: { isContextMenu: boolean; file: FileType }) => {
    const MenuComponent = isContextMenu
      ? ContextMenuContent
      : DropdownMenuContent;
    const SeparatorComponent = isContextMenu
      ? ContextMenuSeparator
      : DropdownMenuSeparator;
    const LabelComponent = isContextMenu ? ContextMenuLabel : DropdownMenuLabel;
    const { singleSelected } = useSingleSelected();
    const { selected } = useSelected();
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState<DialogType>("no");
    const router = useRouter();
    const allSelected: Array<FileType | FolderType | null> =
      !selected || selected?.length === 0 ? [singleSelected] : selected;

    const fileActions = [
      {
        name: "Открыть",
        icon: null,
        onClick: () => {
          // Действие при открытии файла
          console.log("Файл открыт");
        },
        shortcut: "Ctrl + O",
      },
      {
        name: "Скачать",
        icon: DownloadIcon,
        onClick: () => {
          router.push(constructDownloadUrl(file.bucketFileId));
        },
        shortcut: "Ctrl + D",
      },
      {
        name: "Инфо",
        icon: InfoIcon,
        onClick: () => {
          setDialogType("info");
          setDialogOpen(true);
        },
        shortcut: "Ctrl + I",
      },
      {
        name: "Переименовать",
        icon: PenLineIcon,
        onClick: () => {
          setDialogType("rename");
          setDialogOpen(true);
        },
        shortcut: "Ctrl + R",
      },
      {
        name: "Поделиться",
        icon: Share2Icon,
        onClick: () => {
          setDialogType("share");
          setDialogOpen(true);
        },
        shortcut: "Ctrl + S",
      },
      {
        name: "Удалить",
        icon: Trash2Icon,
        onClick: () => {
          setDialogType("delete");
          setDialogOpen(true);
        },
        shortcut: "Delete",
      },
    ];

    const executeActionByName = (actionName: string) => {
      const action = fileActions.find((action) => action.name === actionName);
      if (action && action.onClick) {
        action.onClick();
      }
    };

    useEffect(() => {
      const handleKeyPress = (event: KeyboardEvent) => {
        const isFileSelected = allSelected?.some(
          (value) => value?.id === file?.id
        );

        if (!isFileSelected) return;

        if ((event.ctrlKey || event.metaKey) && event.key === "o") {
          event.preventDefault();
          executeActionByName("Открыть");
        }
        if ((event.ctrlKey || event.metaKey) && event.key === "d") {
          event.preventDefault();
          executeActionByName("Скачать");
        }
        if ((event.ctrlKey || event.metaKey) && event.key === "i") {
          event.preventDefault();
          executeActionByName("Инфо");
        }
        if ((event.ctrlKey || event.metaKey) && event.key === "r") {
          event.preventDefault();
          executeActionByName("Переименовать");
        }
        if ((event.ctrlKey || event.metaKey) && event.key === "s") {
          event.preventDefault();
          executeActionByName("Поделиться");
        }
        if (event.key === "Delete") {
          event.preventDefault();
          executeActionByName("Удалить");
        }
      };

      window.addEventListener("keydown", handleKeyPress);
      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }, [allSelected, file]);

    return (
      <>
        <MenuComponent>
          <LabelComponent className="flex gap-2 items-center">
            <FilesIcon className="size-4" />
            <span className="text-xs font-normal">
              {getWordEnding(allSelected?.length, [
                "Выбран",
                "Выбрано",
                "Выбрано",
              ])}{" "}
              {allSelected?.length}{" "}
              {getWordEnding(allSelected?.length, ["файл", "файла", "файлов"])}
            </span>
          </LabelComponent>
          <SeparatorComponent className="my-1" />
          {fileActions.map((item) => {
            return (
              <AdvancedMenuItem
                key={item.name}
                isContextMenu={isContextMenu}
                icon={item.icon && <item.icon size={15} />}
                shortcut={item.shortcut}
                onClick={item.onClick}
              >
                {item.name}
              </AdvancedMenuItem>
            );
          })}
        </MenuComponent>
        {
          {
            rename: (
              <FileRenameDialog
                isOpen={isDialogOpen}
                setOpen={setDialogOpen}
                file={file}
              />
            ),
            delete: (
              <FileDeleteDialog
                isOpen={isDialogOpen}
                setOpen={setDialogOpen}
                file={file}
              />
            ),
            info: (
              <FileInfoDialog
                isOpen={isDialogOpen}
                setOpen={setDialogOpen}
                file={file}
              />
            ),
            share: (
              <FileSharingDialog
                isOpen={isDialogOpen}
                setOpen={setDialogOpen}
                file={file}
              />
            ),
            no: null,
          }[dialogType]
        }
      </>
    );
  }
);

export default FileMenuContent;
