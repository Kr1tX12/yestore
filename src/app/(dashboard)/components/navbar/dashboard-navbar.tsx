import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SearchIcon, X } from "lucide-react";
import React from "react";

const DashboardNavbar = ({ className }: { className?: string }) => {
  return (
    <header className={cn("fixed top-0 right-0 left-0 bg-transparent border border-border backdrop-blur-sm z-[100]", className)}>
      <nav className="flex justify-between items-center px-4 py-1">
        <div></div>
        <form className="flex gap-1 items-center border border-border hover:border-primary rounded-2xl pr-1 pl-4 h-10 transition-colors">
          <input
            placeholder="Поищите..."
            className="!bg-transparent active:bg-transparent outline-none"
          />
          <Button variant="ghost" className="size-8">
            <X />
          </Button>
          <Button type="submit" className="size-8 rose-shadow">
            <SearchIcon />
          </Button>
        </form>
      </nav>
    </header>
  );
};

export default DashboardNavbar;
