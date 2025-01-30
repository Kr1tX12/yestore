import { ContextMenuItem } from "@/components/ui/context-menu";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const AdvancedMenuItem = ({
  icon,
  shortcut,
  color = "white",
  isContextMenu,
  children,
  onClick,
}: {
  icon?: React.ReactNode;
  shortcut?: string;
  color?: string;
  isContextMenu?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) => {
  const MenuItemComponent = isContextMenu ? ContextMenuItem : DropdownMenuItem;

  return (
    <MenuItemComponent onClick={onClick} className={`flex justify-between items-center gap-12`}>
      <span className={`flex items-center gap-2 text-${color}`}>
        {icon}
        {children}
      </span>

      {shortcut && <span className={`text-zinc-400 text-xs`}>{shortcut}</span>}
    </MenuItemComponent>
  );
};

export default AdvancedMenuItem;
