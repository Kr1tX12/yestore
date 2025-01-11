import Link from "next/link";
import Image from "next/image";
import { ActivityIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn("flex items-center gap-2 transition-all", className)}>
      <ActivityIcon />
      <h1 className="font-extrabold max-md:hidden">YEStore</h1>
    </Link>
  );
};

export default Logo;
