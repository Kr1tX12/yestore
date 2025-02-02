import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SearchIcon, X } from "lucide-react";
import React from "react";
import Search from "./search";

const DashboardNavbar = ({ className }: { className?: string }) => {
  return (
    <header className={cn("fixed top-0 right-0 left-0 bg-transparent border border-border backdrop-blur-sm z-[100]", className)}>
      <nav className="flex justify-between items-center px-4 py-1 ">
        <div></div>
        <Search />
      </nav>
    </header>
  );
};

export default DashboardNavbar;
