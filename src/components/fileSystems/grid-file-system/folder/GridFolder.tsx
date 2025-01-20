"use client";

import { FolderType } from "../../types";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { getIconForFolder } from "../../utils";
import { usePath } from "../context/PathContext";
import { useSelected } from "../context/SelectedContext";
import { useSingleSelected } from "../context/SingleSelectedContext";
import clsx from "clsx";

const GridFolder = ({ folder }: { folder: FolderType }) => {
  const { path, setPath } = usePath();
  const { selected, setSelected } = useSelected();
  const { singleSelected, setSingleSelected } = useSingleSelected();
  const isSelectionEnabled = selected !== null;
  const isSelected = selected?.includes(folder);
  const isSingleSelected: boolean = singleSelected === folder;

  const FolderIcon = useMemo(() => {
    return getIconForFolder(folder);
  }, [folder]);

  const openFolder = () => {
    setPath((prev) => {
      if (!prev) return [folder];
      return [...prev, folder];
    });
  };

  const selectSingle = (value?: boolean) => {
    if (value === undefined) {
      value = !isSingleSelected;
    }
    setSingleSelected(value ? folder : null);
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
        return [...prev, folder];
      });
    } else {
      if (!isSelected) return;

      setSelected((prev) => {
        if (!prev) return prev;
        return prev.filter((item) => item.id != folder.id);
      });
    }
  };

  const onFolderClick = () => {
    if (isSingleSelected) {
      openFolder();

      return;
    }

    if (isSelectionEnabled) {
      select();
    } else {
      selectSingle();
    }
  };

  return (
    <button
      onClick={onFolderClick}
      className={clsx(
        "size-20 hover:bg-accent/50 active:bg-accent transition-colors rounded-md",
        (isSelected || isSingleSelected) &&
          "bg-primary hover:bg-primary/80 active:bg-primary/50"
      )}
    >
      <div className="flex flex-col items-center justify-center">
        <FolderIcon className="size-10" />
        <span className="text-xs text-stone-300 select-none">{folder.name}</span>
      </div>
    </button>
  );
};

export default GridFolder;