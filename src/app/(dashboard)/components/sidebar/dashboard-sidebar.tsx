"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import { FolderIcon } from "lucide-react";
import DashboardSidebarFolderPart from "./sidebar-parts/folder-part";
import Logo from "@/components/NavbarLogo";
import DashboardSidebarHeader from "./sidebar-parts/sidebar-header";
import DashboardSidebarMainPart from "./sidebar-parts/dashboard-sidebar-main-part";
import DashboardSidebarFooter from "./sidebar-parts/footer/dashboard-sidebar-footer";
import { Button } from "@/components/ui/button";

const DashboardSidebar = () => {
  return (
    <Sidebar className="z-[120]">
      <SidebarHeader>
        <Button className="" variant="ghost">
          <Logo />
        </Button>
      </SidebarHeader>
      <SidebarContent className="px-4 mt-2">
        <SidebarMenu className="flex gap-4">
          <DashboardSidebarMainPart />
          <DashboardSidebarFolderPart />
        </SidebarMenu>
      </SidebarContent>
      <DashboardSidebarFooter />
    </Sidebar>
  );
};

export default DashboardSidebar;
