import Link from "next/link";
import { NavbarItem } from "./NavbarConstants";

export const NavbarItemLink = ({
  navbarItem,
  isActivated,
}: {
  navbarItem: NavbarItem;
  isActivated: boolean;
}) => {
  const { href, label } = navbarItem;

  return (
    <Link href={href} key={href}>
      <span
        className={`font-bold text-sm transition-colors ${isActivated ? "text-blue-400" : "text-zinc-400 hover:text-zinc-50"}`}
      >
        {label}
      </span>
    </Link>
  );
};

export const NavbarItemForm = ({
  navbarItem,
  action,
}: {
  navbarItem: NavbarItem;
  action: (formData: FormData) => void | Promise<void>;
}) => {
  const { label } = navbarItem;

  return (
    <form action={action}>
      <button type="submit">{label}</button>
    </form>
  );
};
