"use client";

import { useUser } from "@/components/auth/user-provider";
import AddFilesButton from "../../files-uploading/add-files-button/add-files-button";
import { UploadingFilesProvider } from "../../providers/uploading-files-provider";
import SelectModeToggle from "../../select-mode-toggle";
import Sort from "@/components/ui/sort";

export const FileSystemOptions = () => {
  const user = useUser();

  return (
    <div className="flex gap-2 items-center">
      <Sort />
      <UploadingFilesProvider>
        <AddFilesButton accountId={user?.accountId} ownerId={user?.$id} />
      </UploadingFilesProvider>
      <SelectModeToggle />
    </div>
  );
};
