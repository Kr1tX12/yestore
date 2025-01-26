import { useUser } from "@/components/auth/user-provider";
import AddFilesButton from "../../files-uploading/add-files-button/add-files-button";
import { UploadingFilesProvider } from "../../providers/uploading-files-provider";
import SelectModeToggle from "../../select-mode-toggle";

export const FileSystemOptions = () => {
  const user = useUser();
  console.log(user);
  return (
    <div className="flex gap-2 items-center">
      <UploadingFilesProvider>
        <AddFilesButton accountId={user?.accountId} ownerId={user?.$id} />
      </UploadingFilesProvider>
      <SelectModeToggle />
    </div>
  );
};
