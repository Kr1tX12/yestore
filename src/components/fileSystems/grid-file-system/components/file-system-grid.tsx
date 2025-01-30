import { cn } from "@/lib/utils";
import React from "react";

const FileSystemGrid = ({ className, children }: { className?: string, children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-[repeat(10,minmax(0,1fr))] max-sm:grid-cols-[repeat(3,minmax(0,1fr))] max-md:grid-cols-[repeat(4,minmax(0,1fr))] max-lg:grid-cols-[repeat(3,minmax(0,1fr))] max-xl:grid-cols-[repeat(4,minmax(0,1fr))] max-2xl:grid-cols-[repeat(6,minmax(0,1fr))] max-3xl:grid-cols-[repeat(6,minmax(0,1fr))] mx-8 gap-1",
        className
      )}
    >
      {children}
    </div>
  );
};

export default FileSystemGrid;
