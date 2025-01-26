import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  BookOpenIcon,
  ChevronRight,
  FolderIcon,
  LucideProps,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export type ItemsType = Array<{
  name: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  href: string;
}>;

const DashboradCollapsibleSidebar = ({
  name,
  icon,
  href,
  children,
}: {
  name: string;
  href: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  children: ItemsType;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const Icon = icon;

  return (
    <Collapsible
      open={true}
      defaultOpen
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <Button
            variant={pathname === href ? "default" : "secondary"}
            onClick={() => router.push(href)}
            className={cn("flex justify-between transition-all px-4 py-5 w-full", pathname === href && "ml-2 w-[calc(100%_-_0.5rem)] rose-shadow")}
          >
            <div className="flex gap-2 items-center">
              <Icon className="size-4" />
              {name}
            </div>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="border-border pt-2">
            {children.map((item) => (
              <Button
                key={item.name}
                size="sm"
                className={cn("transition-all w-full border-b-4 hover:border-b hover:border-t-4 border-border", pathname === item.href && "ml-2 w-[calc(100%_-_0.5rem)] rose-shadow border-rose-950")}
                onClick={() => router.push(item.href)}
                variant={pathname === item.href ? "default" : "outline"}
              >
                <item.icon className="size-4" />
                {item.name}
              </Button>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

export default DashboradCollapsibleSidebar;
