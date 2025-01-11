import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { BookOpenIcon, ChevronRight, FolderIcon, LucideProps } from "lucide-react";
import React, { useState } from "react";

export type ItemsType = Array<{
    name: string;
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
  }>;

const DashboradCollapsibleSidebar = ({ name, icon, children}: {name: string, icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>, children: ItemsType}) => {
  const [open, setOpen] = useState<boolean>();

  const Icon = icon;

  return (
    <Collapsible
      open={open}
      onOpenChange={(isOpen) => setOpen(isOpen)}
      defaultOpen
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className="flex justify-between transition-colors border border-border p-4">
            <div className="flex gap-2 items-center">
              <Icon className="size-4" />
              {name}
            </div>
            <ChevronRight
              className={cn(
                open ? "rotate-90" : "rotate-0",
                "transition-transform"
              )}
            />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="border-border pt-2">
            {children.map((item) => (
              <SidebarMenuSubButton
                key={item.name}
                className="flex items-center gap-2 cursor-pointer hover:bg-secondary px-4 transition-colors"
              >
                <item.icon className="size-4" />
                {item.name}
              </SidebarMenuSubButton>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

export default DashboradCollapsibleSidebar;
