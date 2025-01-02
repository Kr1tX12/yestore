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
  CopyIcon,
  Scissors,
  ClipboardIcon,
  Trash2,
  FilesIcon,
} from "lucide-react";
import AdvancedMenuItem from "./AdvancedMenuItem";
import { FileType } from "../types";
import { useSingleSelected } from "../context/SingleSelectedContext";
import { useSelected } from "../context/SelectedContext";
import { getWordEnding } from "@/lib/utils";

const FileMenuContent = ({
  isContextMenu,
  file,
}: {
  isContextMenu: boolean;
  file: FileType;
}) => {
  const MenuComponent = isContextMenu
    ? ContextMenuContent
    : DropdownMenuContent;
  const SeparatorComponent = isContextMenu
    ? ContextMenuSeparator
    : DropdownMenuSeparator;
  const LabelComponent = isContextMenu ? ContextMenuLabel : DropdownMenuLabel;

  const { singleSelected } = useSingleSelected();
  const { selected } = useSelected();
  
  const allSelected = !selected || selected?.length === 0 ? [singleSelected] : selected;


  return (
    <MenuComponent>
      <LabelComponent className="flex gap-2 items-center">
        <FilesIcon className="size-4" />
        <span className="text-xs font-normal">{getWordEnding(allSelected?.length, ['Выбран', 'Выбрано', 'Выбрано'])} {allSelected?.length} {getWordEnding(allSelected?.length, ['файл', 'файла', 'файлов'])}</span>
      </LabelComponent>
      <SeparatorComponent className="my-1" />
      <AdvancedMenuItem isContextMenu={isContextMenu}>Открыть</AdvancedMenuItem>
      <SeparatorComponent className="my-1" />
      <AdvancedMenuItem
        isContextMenu={isContextMenu}
        icon={<CopyIcon size={15} />}
        shortcut="Ctrl + C"
      >
        Копировать
      </AdvancedMenuItem>
      <AdvancedMenuItem
        isContextMenu={isContextMenu}
        icon={<Scissors size={15} />}
        shortcut="Ctrl + X"
      >
        Вырезать
      </AdvancedMenuItem>
      <AdvancedMenuItem
        isContextMenu={isContextMenu}
        icon={<ClipboardIcon size={15} />}
        shortcut="Ctrl + V"
      >
        Вставить рядом
      </AdvancedMenuItem>
      <SeparatorComponent className="my-1" />
      <AdvancedMenuItem
        isContextMenu={isContextMenu}
        icon={<Trash2 size={15} />}
        shortcut="Ctrl + Delete"
        color={"red-400"}
      >
        Удалить
      </AdvancedMenuItem>
    </MenuComponent>
  );
};

export default FileMenuContent;
