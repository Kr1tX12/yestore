import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronRight,
  CircleAlert,
  FileText,
  FolderIcon,
  ImageIcon,
  LucideProps,
  VideoIcon,
} from "lucide-react";
import React, { useState } from "react";
import DashboradCollapsibleSidebar from "./dashboard-sidebar-collapsible";

const items: ItemsType = [
  {
    name: "Фото",
    icon: ImageIcon,
  },
  {
    name: "Видео",
    icon: VideoIcon,
  },
  {
    name: "Документы",
    icon: FileText,
  },
  {
    name: "Важное",
    icon: CircleAlert,
  },
];

type ItemsType = Array<{
  name: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}>;

const DashboardSidebarFolderPart = () => {

  return (
    <DashboradCollapsibleSidebar name="Популярные папки" icon={FolderIcon}>
      {items}
    </DashboradCollapsibleSidebar>
  );
};

export default DashboardSidebarFolderPart;
