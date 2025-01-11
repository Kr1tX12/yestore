"use client";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const chartData = [
  { date: "2025-01-01", dataGB: 0.1 },
  { date: "2025-01-02", dataGB: 0.15 },
  { date: "2025-01-03", dataGB: 0.15 },
  { date: "2025-01-04", dataGB: 0.15 },
  { date: "2025-01-05", dataGB: 0.2 },
  { date: "2025-01-06", dataGB: 0.25 },
  { date: "2025-01-07", dataGB: 0.25 },
  { date: "2025-01-08", dataGB: 0.3 },
  { date: "2025-01-09", dataGB: 0.35 },
  { date: "2025-01-10", dataGB: 0.35 },
  { date: "2025-01-11", dataGB: 0.35 },
  { date: "2025-01-12", dataGB: 0.4 },
  { date: "2025-01-13", dataGB: 0.4 },
  { date: "2025-01-14", dataGB: 0.45 },
  { date: "2025-01-15", dataGB: 0.45 },
  { date: "2025-01-16", dataGB: 0.45 },
  { date: "2025-01-17", dataGB: 0.5 },
  { date: "2025-01-18", dataGB: 0.5 },
  { date: "2025-01-19", dataGB: 0.5 },
  { date: "2025-01-20", dataGB: 0.5 },
  { date: "2025-01-21", dataGB: 0.55 },
  { date: "2025-01-22", dataGB: 0.55 },
  { date: "2025-01-23", dataGB: 0.55 },
  { date: "2025-01-24", dataGB: 0.6 },
  { date: "2025-01-25", dataGB: 0.6 },
  { date: "2025-01-26", dataGB: 0.6 },
  { date: "2025-01-27", dataGB: 0.6 },
  { date: "2025-01-28", dataGB: 0.65 },
  { date: "2025-01-29", dataGB: 0.65 },
  { date: "2025-01-30", dataGB: 0.65 },
  { date: "2025-01-31", dataGB: 0.65 },
  { date: "2025-02-01", dataGB: 0.7 },
  { date: "2025-02-02", dataGB: 0.7 },
  { date: "2025-02-03", dataGB: 0.7 },
  { date: "2025-02-04", dataGB: 0.7 },
  { date: "2025-02-05", dataGB: 0.75 },
  { date: "2025-02-06", dataGB: 0.75 },
  { date: "2025-02-07", dataGB: 0.75 },
  { date: "2025-02-08", dataGB: 0.75 },
  { date: "2025-02-09", dataGB: 0.8 },
  { date: "2025-02-10", dataGB: 0.8 },
  { date: "2025-02-11", dataGB: 0.8 },
  { date: "2025-02-12", dataGB: 0.8 },
  { date: "2025-02-13", dataGB: 0.8 },
  { date: "2025-02-14", dataGB: 0.8 },
  { date: "2025-02-15", dataGB: 0.75 }, // Удаление данных
  { date: "2025-02-16", dataGB: 0.75 },
  { date: "2025-02-17", dataGB: 0.75 },
  { date: "2025-02-18", dataGB: 0.75 },
  { date: "2025-02-19", dataGB: 0.8 },
  { date: "2025-02-20", dataGB: 0.8 },
  { date: "2025-02-21", dataGB: 0.8 },
  { date: "2025-02-22", dataGB: 0.8 },
  { date: "2025-02-23", dataGB: 0.8 },
  { date: "2025-02-24", dataGB: 0.8 },
  { date: "2025-02-25", dataGB: 0.75 }, // Удаление данных
  { date: "2025-02-26", dataGB: 0.75 },
  { date: "2025-02-27", dataGB: 0.75 },
  { date: "2025-02-28", dataGB: 0.75 },
  { date: "2025-03-01", dataGB: 0.8 },
  { date: "2025-03-02", dataGB: 0.8 },
  { date: "2025-03-03", dataGB: 0.8 },
  { date: "2025-03-04", dataGB: 0.8 },
  { date: "2025-03-05", dataGB: 0.85 },
  { date: "2025-03-06", dataGB: 0.85 },
  { date: "2025-03-07", dataGB: 0.85 },
  { date: "2025-03-08", dataGB: 0.85 },
  { date: "2025-03-09", dataGB: 0.85 },
  { date: "2025-03-10", dataGB: 0.85 },
  { date: "2025-03-11", dataGB: 0.85 },
  { date: "2025-03-12", dataGB: 0.85 },
  { date: "2025-03-13", dataGB: 0.85 },
  { date: "2025-03-14", dataGB: 0.85 },
  { date: "2025-03-15", dataGB: 0.8 }, // Удаление данных
  { date: "2025-03-16", dataGB: 0.8 },
  { date: "2025-03-17", dataGB: 0.8 },
  { date: "2025-03-18", dataGB: 0.8 },
  { date: "2025-03-19", dataGB: 0.85 },
  { date: "2025-03-20", dataGB: 0.85 },
  { date: "2025-03-21", dataGB: 0.85 },
  { date: "2025-03-22", dataGB: 0.85 },
  { date: "2025-03-23", dataGB: 0.85 },
  { date: "2025-03-24", dataGB: 0.85 },
  { date: "2025-03-25", dataGB: 0.85 },
  { date: "2025-03-26", dataGB: 0.85 },
  { date: "2025-03-27", dataGB: 0.85 },
  { date: "2025-03-28", dataGB: 0.85 },
  { date: "2025-03-29", dataGB: 0.85 },
  { date: "2025-03-30", dataGB: 0.85 },
  { date: "2025-03-31", dataGB: 0.85 },
  { date: "2025-04-01", dataGB: 0.85 },
  { date: "2025-04-02", dataGB: 0.85 },
  { date: "2025-04-03", dataGB: 0.85 },
  { date: "2025-04-04", dataGB: 0.85 },
  { date: "2025-04-05", dataGB: 0.85 },
  { date: "2025-04-06", dataGB: 0.85 },
  { date: "2025-04-07", dataGB: 0.85 },
  { date: "2025-04-08", dataGB: 0.85 },
  { date: "2025-04-09", dataGB: 0.85 },
  { date: "2025-04-10", dataGB: 0.85 },
  { date: "2025-04-11", dataGB: 0.85 },
  { date: "2025-04-12", dataGB: 0.85 },
  { date: "2025-04-13", dataGB: 0.85 },
  { date: "2025-04-14", dataGB: 0.85 },
  { date: "2025-04-15", dataGB: 0.85 },
  { date: "2025-04-16", dataGB: 0.85 },
  { date: "2025-04-17", dataGB: 0.85 },
  { date: "2025-04-18", dataGB: 0.85 },
  { date: "2025-04-19", dataGB: 0.85 },
  { date: "2025-04-20", dataGB: 0.85 },
  { date: "2025-04-21", dataGB: 0.85 },
  { date: "2025-04-22", dataGB: 0.85 },
  { date: "2025-04-23", dataGB: 0.85 },
  { date: "2025-04-24", dataGB: 0.85 },
  { date: "2025-04-25", dataGB: 0.85 },
  { date: "2025-04-26", dataGB: 0.85 },
  { date: "2025-04-27", dataGB: 0.85 },
  { date: "2025-04-28", dataGB: 0.85 },
  { date: "2025-04-29", dataGB: 0.85 },
  { date: "2025-04-30", dataGB: 0.85 },
];
const chartConfig = {
  dataGB: {
    label: "GB",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function DataStoredChart() {
  const [timeRange, setTimeRange] = React.useState("90d");
  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date(chartData[chartData.length - 1].date);
    let daysToSubtract = 365;
    if (timeRange === "90d") {
      daysToSubtract = 90;
    } else if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card>
      <CardHeader className="flex flex-row gap-8 items-center justify-between">
        <div className="flex flex-col gap-2">
          <CardTitle>Сколько данных хранится</CardTitle>
          <CardDescription>
            Какое количество данных хранится в последний год
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Selct" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="7d">7 дней</SelectItem>
              <SelectItem value="30d">30 дней</SelectItem>
              <SelectItem value="90d">90 дней</SelectItem>
              <SelectItem value="365d">365 дней</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            
            accessibilityLayer
            data={filteredData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                value.replace(new RegExp("-", "g"), ".")
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="bg-card" indicator="line" />}
            />
            <Area
              dataKey="dataGB"
              format="data"
              type="natural"
              fill="var(--color-dataGB)"
              fillOpacity={0.4}
              stroke="var(--color-dataGB)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
