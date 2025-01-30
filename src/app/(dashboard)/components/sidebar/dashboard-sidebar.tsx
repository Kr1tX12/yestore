"use client";

import {
  Sidebar,
  SidebarContent, SidebarHeader,
  SidebarMenu
} from "@/components/ui/sidebar";
import Logo from "@/components/NavbarLogo";
import DashboardSidebarMainPart from "./sidebar-parts/dashboard-sidebar-main-part";
import DashboardSidebarFooter from "./sidebar-parts/footer/dashboard-sidebar-footer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


const DashboardSidebar = ({ className }: { className?: string }) => {
  return (
    <Sidebar className={cn("z-[120]", className)}>
      <SidebarHeader>
        <Button variant="ghost">
          <Logo />
        </Button>
      </SidebarHeader>
      <SidebarContent className="px-4 mt-2">
        <SidebarMenu className="flex gap-2">
          <DashboardSidebarMainPart />
        </SidebarMenu>
      </SidebarContent>
      <DashboardSidebarFooter />
    </Sidebar>
  );
};

export default DashboardSidebar;
