import { Button } from "@/components/ui/button";
import { SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ChartColumnIcon, EarthIcon, LayoutDashboardIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import path from "path";
import React from "react";

const items = [
  {
    name: "Статистика",
    icon: ChartColumnIcon,
    path: "/dashboard/stats",
  },
  {
    name: "Все файлы",
    icon: LayoutDashboardIcon,
    path: "/dashboard/files",
  },
  {
    name: "Публичные данные",
    icon: EarthIcon,
    path: "/dashboard/public",
  },
];
const DashboardSidebarMainPart = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <SidebarMenuItem className="grid gap-2">
      {items.map((item) => (
        <Button
          key={item.name}
          className={cn("w-full transition-all", pathname === item.path ? 'ml-2 w-[calc(100%_-_0.5rem)] rose-shadow' : '')}
          variant={pathname === item.path ? "default" : "secondary"}
          size="lg"
          onClick={() => router.push(item.path)}
        >
          <item.icon />
          {item.name}
        </Button>
      ))}
    </SidebarMenuItem>
  );
};

export default DashboardSidebarMainPart;
