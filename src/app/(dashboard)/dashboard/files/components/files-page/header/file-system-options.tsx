import AddFilesButton from "../../files-uploading/add-files-button/add-files-button";
import { UploadingFilesProvider } from "../../providers/uploading-files-provider";
import SelectModeToggle from "../../select-mode-toggle";

export const FileSystemOptions = () => {
  return (
    <div className="flex gap-2 items-center">
      <UploadingFilesProvider>
        <AddFilesButton />
      </UploadingFilesProvider>
      <SelectModeToggle />
    </div>
  );
};
