"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { DashboardStatsType, FileFilterType } from "../../../../../types";

const chartConfig = {
  image: {
    label: "Изображения",
    color: "hsl(var(--chart-1))",
  },
  video: {
    label: "Видео",
    color: "hsl(var(--chart-2))",
  },
  document: {
    label: "Документы",
    color: "hsl(var(--chart-3))",
  },
  audio: {
    label: "Аудио",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Остальное",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function FileTypesChart({ stats }: { stats: DashboardStatsType }) {
  const chartData = Object.entries(stats.fileTypes).map(([key, value], i) => ({
    key,
    ...(value as { count: number; size: number }), // Указываем тип вручную
    fill: `hsl(var(--chart-${i + 1}))`
  }));

  const totalFiles = React.useMemo(() => {
    return stats.filesCount;
  }, []);

  const biggestType = chartData.sort((a, b) => b.count - a.count)[0];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Виды файлов</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-80"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="bg-card" />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="key"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-primary-foreground text-3xl font-bold"
                        >
                          {totalFiles.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Файлов
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Самый используемый вид файла:{" "}
          <span className="text-primary">{chartConfig[biggestType.key as keyof typeof chartConfig].label}</span>
        </div>
        <div className="leading-none text-muted-foreground">
          Показаны данные со всех найденных файлов вашего облака
        </div>
      </CardFooter>
    </Card>
  );
}
