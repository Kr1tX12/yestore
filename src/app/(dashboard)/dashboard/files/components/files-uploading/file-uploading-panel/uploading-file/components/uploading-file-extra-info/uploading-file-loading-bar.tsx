import { Progress } from "@/components/ui/progress";

export const UploadingFileLoadingBar = ({
    file,
    progress,
  }: {
    file: File;
    progress: number;
  }) => {
    return (
      <div className="flex flex-col w-24 items-center">
        <Progress value={progress} />
        <p className="text-[8px] text-zinc-400">125MB / 250MB</p>
      </div>
    );
  };