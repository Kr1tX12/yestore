"use client";

import { usePath } from "@/components/fileSystems/providers/PathContext";
import { FolderNowName } from "./folder-now-name";
import { ToPreviousFolderButton } from "./to-previous-folder-button";

export const FolderNowInfo = () => {
  const { path } = usePath();

  const isRootFolder = !(path && path.length > 1);
  return (
    <div className="flex w-full items-center gap-2">
      {!isRootFolder && <ToPreviousFolderButton />}
      <FolderNowName />
    </div>
  );
};
