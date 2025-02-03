import { Progress } from "@/components/ui/progress";
import {
  ChartPieIcon,
  FileIcon,
  TrendingUpIcon,
  UserRoundIcon,
} from "lucide-react";
import React from "react";
import { DashboardStatsType } from "../../../../../types";
import { convertFileSize } from "@/lib/utils";
import { MAX_DISC_SIZE } from "@/constants";

const HeaderStats = ({ stats }: { stats: DashboardStatsType }) => {
  return (
    <div className="flex pb-8 justify-between">
      <DiskCapacityStats stats={stats} />
      <OtherStats stats={stats} />
    </div>
  );
};

const DiskCapacityStats = ({ stats }: { stats: DashboardStatsType }) => {
  const progressValue = Number(
    ((stats.totalSize / MAX_DISC_SIZE) * 100).toFixed(1)
  );

  const text = `${convertFileSize(stats.totalSize)} от ${convertFileSize(MAX_DISC_SIZE)} занято`;

  return (
    <div className="flex flex-col items-center justify-center hover:scale-105 transition-transform">
      <div className="text-stone-500 text-5xl font-black h-0">{text}</div>
      <div
        className="w-full mb-2 text-rose-50 text-5xl font-black"
        style={{
          clipPath: `inset(0 ${100 - progressValue}% 0 0)`,
        }}
      >
        {text}
      </div>

      <Progress value={progressValue} />

      <p className="text-center font-light text-stone-500 text-sm">
        {progressValue}%
      </p>
    </div>
  );
};

const otherStats = (stats: DashboardStatsType) => [
  {
    name: "Файлов на диске",
    title: stats.filesCount,
    icon: FileIcon,
  },
  {
    name: "Средний размер файла",
    title: convertFileSize(stats.totalSize / stats.filesCount),
    icon: ChartPieIcon,
  },
  {
    name: "Самый большой файл",
    title: convertFileSize(stats.biggest5Files[0].size),
    icon: TrendingUpIcon,
  },
];
const OtherStats = ({ stats }: { stats: DashboardStatsType }) => {
  return (
    <div className="flex gap-8 border border-border px-5 py-5 rounded-md">
      {otherStats(stats).map((stat, index) => (
        <div
          key={index}
          className="flex flex-col flex-gap-2 items-center hover:scale-105 transition-transform"
        >
          <stat.icon />
          <span className="font-bold text-3xl -mb-1">{stat.title}</span>
          <span className="text-xs text-stone-400">{stat.name}</span>
        </div>
      ))}
    </div>
  );
};

export default HeaderStats;
