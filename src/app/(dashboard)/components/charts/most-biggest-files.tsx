'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { FileType } from "@/components/file-system/types";

import { CircleAlert, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData: Array<FileType> = [
  {
    id: "file-1",
    name: "cat_memes",
    extension: "png",
    size: 98,
    lastModified: new Date("2023-01-01"),
  },
  {
    id: "file-2",
    name: "epic_fail_video",
    extension: "mp4",
    size: 1500,
    lastModified: new Date("2023-01-02"),
  },
  {
    id: "file-3",
    name: "secret_recipe",
    extension: "pdf",
    size: 45,
    lastModified: new Date("2023-01-03"),
  },
  {
    id: "file-4",
    name: "vacation_photos",
    extension: "zip",
    size: 200,
    lastModified: new Date("2023-01-04"),
  },
  {
    id: "file-5",
    name: "dog_videos",
    extension: "mp4",
    size: 120,
    lastModified: new Date("2023-01-05"),
  },
  {
    id: "file-6",
    name: "funny_dance",
    extension: "mp4",
    size: 1600,
    lastModified: new Date("2023-01-06"),
  },
  {
    id: "file-7",
    name: "grandma_stories",
    extension: "pdf",
    size: 50,
    lastModified: new Date("2023-01-07"),
  },
  {
    id: "file-8",
    name: "old_games",
    extension: "zip",
    size: 250,
    lastModified: new Date("2023-01-08"),
  },
  {
    id: "file-9",
    name: "alien_sightings",
    extension: "png",
    size: 110,
    lastModified: new Date("2023-01-09"),
  },
  {
    id: "file-10",
    name: "bloopers",
    extension: "mp4",
    size: 1400,
    lastModified: new Date("2023-01-10"),
  },
  {
    id: "file-11",
    name: "mystery_novel",
    extension: "pdf",
    size: 55,
    lastModified: new Date("2023-01-11"),
  },
  {
    id: "file-12",
    name: "party_playlist",
    extension: "zip",
    size: 300,
    lastModified: new Date("2023-01-12"),
  },
  {
    id: "file-13",
    name: "cat_vs_dog",
    extension: "png",
    size: 130,
    lastModified: new Date("2023-01-13"),
  },
  {
    id: "file-14",
    name: "karaoke_night",
    extension: "mp4",
    size: 1700,
    lastModified: new Date("2023-01-14"),
  },
  {
    id: "file-15",
    name: "grandpa_jokes",
    extension: "pdf",
    size: 60,
    lastModified: new Date("2023-01-15"),
  },
  {
    id: "file-16",
    name: "old_photos",
    extension: "zip",
    size: 350,
    lastModified: new Date("2023-01-16"),
  },
  {
    id: "file-17",
    name: "unicorn_sightings",
    extension: "png",
    size: 140,
    lastModified: new Date("2023-01-17"),
  },
  {
    id: "file-18",
    name: "prank_videos",
    extension: "mp4",
    size: 1800,
    lastModified: new Date("2023-01-18"),
  },
  {
    id: "file-19",
    name: "comic_book",
    extension: "pdf",
    size: 65,
    lastModified: new Date("2023-01-19"),
  },
  {
    id: "file-20",
    name: "music_hits",
    extension: "zip",
    size: 400,
    lastModified: new Date("2023-01-20"),
  },
  {
    id: "file-21",
    name: "dinosaur_facts",
    extension: "png",
    size: 150,
    lastModified: new Date("2023-01-21"),
  },
  {
    id: "file-22",
    name: "magic_tricks",
    extension: "mp4",
    size: 1900,
    lastModified: new Date("2023-01-22"),
  },
  {
    id: "file-23",
    name: "puzzle_solutions",
    extension: "pdf",
    size: 70,
    lastModified: new Date("2023-01-23"),
  },
  {
    id: "file-24",
    name: "retro_games",
    extension: "zip",
    size: 450,
    lastModified: new Date("2023-01-24"),
  },
  {
    id: "file-25",
    name: "robot_dance",
    extension: "png",
    size: 160,
    lastModified: new Date("2023-01-25"),
  },
];

const sortedChartData = chartData.sort((a, b) => b.size - a.size).slice(0, 4);

const chartConfig = {
  size: {
    label: "GB",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function MostBiggestFiles() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Самые большие файлы</CardTitle>
        <CardDescription>Эти файлы огромные</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={sortedChartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              className="text-center"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="bg-card" />}
            />
            <Bar dataKey="size" fill="var(--color-size)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-card-foreground"
                fontSize={12}
                formatter={(value: any) => `${value} GB`}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 items-center font-medium leading-none ml-2">
        <CircleAlert className="size-4" /> Эти файлы занимают <span className="text-rose-200">32GB / 38GB</span>
        </div>
      </CardFooter>
    </Card>
  );
}

export default MostBiggestFiles;
