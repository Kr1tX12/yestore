import { Progress } from "@/components/ui/progress";
import { ChartPieIcon, FileIcon, TrendingUpIcon, UserRoundIcon } from "lucide-react";
import React from "react";

const HeaderStats = () => {
  return (
    <div className="flex pb-8 justify-between">
      <DiskCapacityStats />
      <OtherStats />
    </div>
  );
};

const DiskCapacityStats = () => {
  const progressValue = 50;

  return (
    <div className="flex flex-col items-center justify-center hover:scale-105 transition-transform">
      <div className="text-stone-500 text-5xl font-black h-0">
        1GB от 2GB занято
      </div>
      <div
        className="w-full mb-2 text-rose-50 text-5xl font-black"
        style={{
          clipPath: `inset(0 ${100 - progressValue}% 0 0)`,
        }}
      >
        1GB от 2GB занято
      </div>

      <Progress value={progressValue} />

      <p className="text-center font-light text-stone-500 text-sm">50%</p>
    </div>
  );
};

const otherStats = [
  {
    name: "Файлов на диске",
    title: "120",
    icon: FileIcon,
  },
  {
    name: "Средний размер файла",
    title: "12.4МБ",
    icon: ChartPieIcon,
  },
  {
    name: "Самый большой файл",
    title: '5604GB',
    icon: TrendingUpIcon,
  },
  {
    name: 'Людей скачали ваши файлы',
    title: 0,
    icon: UserRoundIcon,
  }
];
const OtherStats = () => {
  return (
    <div className="flex gap-8 border border-border px-5 py-5 rounded-md">
      {otherStats.map((stat, index) => (
        <div key={index} className="flex flex-col flex-gap-2 items-center hover:scale-105 hover:scale-105 transition-transform">
          <stat.icon />
          <span className="font-bold text-3xl -mb-1">{stat.title}</span>
          <span className="text-xs text-stone-400">{stat.name}</span>
        </div>
      ))}
    </div>
  );
};

export default HeaderStats;
