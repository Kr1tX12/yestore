import Thumbnail from "@/components/ui/thumbnail";
import { convertFileToUrl, getFileType } from "@/lib/utils";

export const UploadingFileIcon = ({ file }: { file: File }) => {
  return (
    <Thumbnail
      type={getFileType(file.name).type}
      extension={getFileType(file.name).extension}
      url={convertFileToUrl(file)}
      iconClassName="size-4"
    />
  );
};
