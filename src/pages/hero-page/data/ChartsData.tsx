import { ChartConfig } from "@/components/ui/chart";
import { ServerCrashIcon, TrendingUp, UserIcon } from "lucide-react";

export const Chart1Data = {
  title: "Загружено данных в GB",
  description: "За последний год",
  bottomDescription: "Намного больше чем в прошлом месяце",
  icon: <TrendingUp className="size-4" />,
  chartData: [
    { month: "Jan", amount: 1245.67 },
    { month: "Feb", amount: 4789.34 },
    { month: "Mar", amount: 3654.89 },
    { month: "Apr", amount: 1123.45 },
    { month: "May", amount: 4890.12 },
    { month: "Jun", amount: 6234.56 },
    { month: "Jul", amount: 13789.01 },
    { month: "Aug", amount: 7345.67 },
    { month: "Sep", amount: 6890.23 },
    { month: "Oct", amount: 7543.89 },
    { month: "Nov", amount: 2123.45 },
    { month: "Dec", amount: 15123.67 },
  ],

  chartConfig: {
    amount: {
      label: "GB",
      color: "#3b82f6",
    },
  } satisfies ChartConfig,
};

export const Chart2Data = {
  title: "Новые пользователи",
  description: "За последний год",
  bottomDescription: "Сервера пока выдерживают",
  icon: <ServerCrashIcon className="size-4" />,
  chartData: [
    { month: "Jan", amount: 1245.67 },
    { month: "Feb", amount: 4789.34 },
    { month: "Mar", amount: 3654.89 },
    { month: "Apr", amount: 1123.45 },
    { month: "May", amount: 4890.12 },
    { month: "Jun", amount: 6234.56 },
    { month: "Jul", amount: 13789.01 },
    { month: "Aug", amount: 7345.67 },
    { month: "Sep", amount: 6890.23 },
    { month: "Oct", amount: 7543.89 },
    { month: "Nov", amount: 2123.45 },
    { month: "Dec", amount: 15123.67 },
  ],

  chartConfig: {
    amount: {
      label: "Пользователей",
      color: "#3b82f6",
    },
  } satisfies ChartConfig,
};
