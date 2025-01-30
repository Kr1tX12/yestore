import { BreadcrumbItem } from "@/components/ui/breadcrumb";
import clsx from "clsx";
import { HomeIcon } from "lucide-react";
import { MouseEventHandler } from "react";
import { FolderType } from "../../../../../../../types";

export const BreadcrumbFile = ({
    folder,
    active,
    onClick,
  }: {
    folder: FolderType;
    active: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
  }) => {
    return (
      <BreadcrumbItem>
        <button
          onClick={onClick}
          className={clsx("select-none", active && "text-white")}
        >
          {folder.name === "Home" ? <HomeIcon className="size-4" /> : folder.name}
        </button>
      </BreadcrumbItem>
    );
  };