import Thumbnail from "@/components/ui/thumbnail";
import { convertFileToUrl, getFileExtension, getFileType } from "@/lib/utils";

export const UploadingFileIcon = ({ file }: { file: File }) => {
  return (
    <Thumbnail
      type={getFileType(file.name)}
      extension={getFileExtension(file.name) ?? ""}
      url={convertFileToUrl(file)}
      iconClassName="size-4"
    />
  );
};
