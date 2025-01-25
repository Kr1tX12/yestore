export const UploadingFileWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <li className="border border-border pl-4 pr-2 py-2 flex items-center gap-2 justify-between rounded-md w-full">
        {children}
      </li>
    );
  };
  