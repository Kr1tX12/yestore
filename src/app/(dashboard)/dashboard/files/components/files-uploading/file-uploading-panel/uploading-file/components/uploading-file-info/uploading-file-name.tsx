export const UploadingFileName = ({ file }: { file: File }) => {
    return (
      <p className="text-sm text-zinc-200 max-w-32 text-nowrap truncate">
        {file.name}
      </p>
    );
  };