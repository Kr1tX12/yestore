export const FilesPageHeader = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex w-full px-12 items-center justify-between">
      {children}
    </div>
  );
};
