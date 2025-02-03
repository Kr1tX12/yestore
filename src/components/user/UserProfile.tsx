import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Progress } from "../ui/progress";
import { useUser } from "../auth/user-provider";
import { cn, convertFileSize } from "@/lib/utils";
import { getDashboardStats } from "@/lib/actions/files.actions";
import { MAX_DISC_SIZE } from "@/constants";

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
    </div>
  );
};

export default UserProfile;
