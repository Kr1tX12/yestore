import Image from "next/image";
import React from "react";
import { cn, getIconForFile } from "@/lib/utils";

const Thumbnail = ({
  type,
  extension,
  url,
  iconClassName,
  imageClassName,
  className,
  size = 20,
}: {
  type: string;
  extension: string;
  url: string;
  iconClassName?: string;
  imageClassName?: string;
  className?: string;
  size?: number;
}) => {
  const isImage = type.includes("image") && extension !== "svg";
  if (isImage) {
    return (
      <figure className="select-none">
        <Image className={cn("object-cover", imageClassName, className)} src={url} alt={type} width={size} height={size} />
      </figure>
    );
  }

  const Icon = getIconForFile(extension);

  return <Icon className={cn(iconClassName, className)} />;
};

export default Thumbnail;
