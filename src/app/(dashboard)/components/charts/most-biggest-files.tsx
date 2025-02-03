"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { CircleAlert, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DashboardStatsType, FileType } from "../../../../../types";
import { convertFileSize } from "@/lib/utils";

const chartConfig = {
  size: {
    label: "GB",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function MostBiggestFiles({ stats }: { stats: DashboardStatsType }) {

  const totalSize = stats.biggest5Files.reduce((acc, file) => acc + file.size, 0);

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
            data={stats.biggest5Files}
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
                formatter={(value: any) => `${convertFileSize(value)}`}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 items-center font-medium leading-none ml-2">
          <CircleAlert className="size-4" /> Эти файлы занимают{" "}
          <span className="text-rose-200">{convertFileSize(totalSize)} / {convertFileSize(stats.totalSize)}</span>
        </div>
      </CardFooter>
    </Card>
  );
}

export default MostBiggestFiles;
