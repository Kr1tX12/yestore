import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import FilesTable from "./utils/files-table";
import { DashboardStatsType, FileType } from "../../../../../types";

const LatestFiles = ({ stats }: { stats: DashboardStatsType }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Последние файлы</CardTitle>
        <CardDescription>
          Последний файл был загружен 2025.01.05
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="pr-4">
          <FilesTable table={stats.latest5Files} />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default LatestFiles;
