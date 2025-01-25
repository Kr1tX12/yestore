import { memo } from "react";
import { UploadingFileExtraInfoWrapper } from "./components/uploading-file-extra-info/uploading-file-extra-info-wrapper";
import { UploadingFileLoadingBar } from "./components/uploading-file-extra-info/uploading-file-loading-bar";
import { UploadingFileIcon } from "./components/uploading-file-info/uploading-file-icon";
import { UplodaingFileInfoWrapper } from "./components/uploading-file-info/uploading-file-info-wrapper";
import { UploadingFileName } from "./components/uploading-file-info/uploading-file-name";
import { UploadingFileWrapper } from "./components/uploading-file-wrapper";
import { RemoveUploadingFileButton } from "./components/uploading-file-extra-info/remove-uploading-file-button";

export const UploadingFile = memo(({ file }: { file: File }) => {
  return (
    <UploadingFileWrapper>
      <UplodaingFileInfoWrapper>
        <UploadingFileIcon file={file} />
        <UploadingFileName file={file} />
      </UplodaingFileInfoWrapper>
      <UploadingFileExtraInfoWrapper>
        <UploadingFileLoadingBar file={file} progress={50} />
        <RemoveUploadingFileButton file={file} />
      </UploadingFileExtraInfoWrapper>
    </UploadingFileWrapper>
  );
});
