import { usePath } from "@/components/fileSystems/providers/PathContext";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";

export const ToPreviousFolderButton = () => {
    const { path, setPath } = usePath();
  
    const toPreviousPath = () => {
      if (path && path?.length <= 1) return;
  
      setPath(path?.slice(0, length - 1) ?? []);
    };
    return (
      <Button onClick={toPreviousPath} variant="ghost" size="icon">
        <ChevronLeftIcon />
      </Button>
    );
  };