import { usePath } from "@/components/fileSystems/providers/PathContext";
import { FolderType } from "../../../../../../../types";

export const useFilesBreadcrumb = () => {
  const { path, setPath } = usePath();
  const onClick = (folder: FolderType) => {
    if (!path) return;

    const index = path?.indexOf(folder);
    const newPath = path.slice(0, index + 1);
    setPath(newPath);
  };

  return { onClick, path };
};
