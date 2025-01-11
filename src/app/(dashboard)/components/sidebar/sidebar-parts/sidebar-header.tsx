import Logo from "@/components/NavbarLogo";
import { SidebarHeader } from "@/components/ui/sidebar";
import React from "react";

const DashboardSidebarHeader = ({ className }: { className?: string }) => {
  return (
    <SidebarHeader>
      <Logo className={className} />
    </SidebarHeader>
  );
};

export default DashboardSidebarHeader;
