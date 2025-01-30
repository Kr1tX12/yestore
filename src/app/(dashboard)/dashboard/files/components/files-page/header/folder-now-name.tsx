import { usePath } from "@/components/fileSystems/providers/PathContext";
import { getIconForFolder } from "@/lib/utils";
import { FolderIcon } from "lucide-react";

export const FolderNowName = () => {
    const { path } = usePath();
  
    const folderNow = path && path[path.length - 1];
    const NowFolderIcon = folderNow ? getIconForFolder(folderNow) : FolderIcon;
  
    return (
      <h1 className="text-2xl font-bold">
        {folderNow && folderNow.name !== "Home" ? (
          <span className="flex gap-2 items-center">
            <NowFolderIcon /> {folderNow.name}
          </span>
        ) : (
          "Все файлы"
        )}
      </h1>
    );
  };