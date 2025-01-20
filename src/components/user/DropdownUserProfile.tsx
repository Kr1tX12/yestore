import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DollarSignIcon, LayoutDashboardIcon, LogOutIcon, SettingsIcon } from "lucide-react";
import UserProfile from "./UserProfile";
import { useUser } from "../auth/user-provider";
import { signOutUser } from "@/lib/actions/user.actions";

const DropdownUserProfile = () => {
  const user = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-8 cursor-pointer">
          <AvatarImage
            className="object-cover cursor-pointer"
            src={user?.avatar}
          />
          <AvatarFallback>{user?.fullname[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <UserProfile />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <LayoutDashboardIcon />
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DollarSignIcon />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-rose-400 hover:!text-rose-300" onClick={signOutUser}>
            <LogOutIcon  />
            Выйти
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownUserProfile;
