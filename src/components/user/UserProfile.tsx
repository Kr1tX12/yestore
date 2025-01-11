import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Progress } from "../ui/progress";
import { useUser } from "../auth/user-provider";
import { cn } from "@/lib/utils";

const UserProfile = ({ className }: { className?: string }) => {
  const user = useUser();
  return (
    <div className={cn("flex items-center justify-between gap-3", className)}>
      <div className="flex items-center gap-2">
        <Avatar className="size-8">
          <AvatarImage
            className="object-cover cursor-pointer"
            src={user?.avatar}
          />
          <AvatarFallback>{user?.fullname[0]}</AvatarFallback>
        </Avatar>

        <p className="truncate max-w-[80px]">{user?.fullname}</p>
      </div>
      <div className="flex flex-col items-center justify-center w-full max-w-20 gap-0 pb-2 translate-y-0">
        <p className="text-[8px] text-zinc-400 text-center h-4 translate-y-1">2GB / 4GB</p>
        <Progress value={50} />
      </div>
    </div>
  );
};

export default UserProfile;
