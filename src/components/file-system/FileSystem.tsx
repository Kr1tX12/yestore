import clsx from "clsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { CloudIcon, LayoutListIcon } from "lucide-react";
import Folder from "./folder/Folder";
import { FolderType } from "./types";
import { useSelected } from "./context/SelectedContext";
import { getItemsFromFolder } from "./utils";
import ChosenFilesPanel from "./chosenFilesPanel/ChosenFilesPanel";
import { ScrollArea } from "@/components/ui/scroll-area";

type FileSystemProps = {
  rootFolder: FolderType;
  hideFirst: boolean;
  className?: string;
  title?: string;
  openFolders?: boolean;
  height?: number;
};

const FileSystem = ({
  rootFolder,
  hideFirst,
  className,
  title,
  openFolders = false,
  height = 200,
}: FileSystemProps) => {
  const { selected, setSelected } = useSelected();
  console.log(className)
  return (
    <>
      <Card className={`backdrop-blur-sm bg-transparent ${className}`} style={{height: height}}>
        <CardHeader className="py-2">
          <CardTitle className="flex items-center justify-between ml-2">
            <div className="flex items-center gap-1">
              <CloudIcon fill="white" />
              <span>{title}</span>
            </div>
            {/* Тумблер для включения/выключения режима Select */}
            <Toggle
              variant="default"
              pressed={selected !== null}
              onPressedChange={(value) => setSelected(value ? [] : null)}
            >
              <LayoutListIcon />
            </Toggle>
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="p-0">
          <ScrollArea>
            <ul className={`flex flex-col gap-1 p-6`} style={{height: height - 55}}>
              {hideFirst ? getItemsFromFolder(rootFolder, openFolders) : <Folder autoOpen={openFolders} folder={rootFolder} />}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Панель с перечислением выбранных файлов */}
      <ChosenFilesPanel />
    </>
  );
};

export default FileSystem;