import { Button } from "@/components/ui/button";
import { SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  AudioLinesIcon,
  ChartColumnIcon,
  EarthIcon,
  FileText,
  ImageIcon,
  LayoutDashboardIcon,
  PenIcon,
  VideoIcon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import DashboradCollapsibleSidebar from "./dashboard-sidebar-collapsible";

const items = [
  {
    name: "Статистика",
    icon: ChartColumnIcon,
    path: "/dashboard/stats",
  },
  {
    name: "Публичные данные",
    icon: EarthIcon,
    path: "/dashboard/public",
  },
  {
    name: "Все файлы",
    icon: LayoutDashboardIcon,
    path: "/dashboard/files",
    collapsible: true,
    collapsibleItems: [
      {
        name: "Фото",
        icon: ImageIcon,
        href: "/dashboard/image",
      },
      {
        name: "Видео",
        icon: VideoIcon,
        href: "/dashboard/video",
      },
      {
        name: "Документы",
        icon: FileText,
        href: "/dashboard/document",
      },
      {
        name: "Аудио",
        icon: AudioLinesIcon,
        href: "/dashboard/audio",
      },
      {
        name: "Остальное",
        icon: PenIcon,
        href: "/dashboard/other",
      },
    ],
  },
];
const DashboardSidebarMainPart = () => {
  const router = useRouter();
  const pathname = usePathname();

  return items.map((item, index) =>
    item.collapsible ? (
      <DashboradCollapsibleSidebar
        name={item.name}
        icon={item.icon}
        href={item.path}
        key={index}
      >
        {item.collapsibleItems}
      </DashboradCollapsibleSidebar>
    ) : (
      <SidebarMenuItem key={index} className="grid gap-2">
        <Button
          key={item.name}
          className={cn(
            "w-full transition-all",
            pathname === item.path
              ? "ml-2 w-[calc(100%_-_0.5rem)] rose-shadow"
              : ""
          )}
          variant={pathname === item.path ? "default" : "secondary"}
          size="lg"
          onClick={() => router.push(item.path)}
        >
          <item.icon />
          {item.name}
        </Button>
      </SidebarMenuItem>
    )
  );
};

export default DashboardSidebarMainPart;
