import Link from "next/link";
import { NavbarItem } from "./NavbarConstants";
import { usePathname } from "next/navigation";
import { NavbarItemLink } from "./NavbarItems";
import NavbarItemsListContainer from "./NavbarItemsListContainer";

const NavbarItemsList = ({ items }: { items: NavbarItem[] }) => {
  const pathname = usePathname();

  return (
    <NavbarItemsListContainer>
      {items.map((item) => (
        <NavbarItemLink
          key={item.href}
          navbarItem={item}
          isActivated={pathname === item.href}
        />
      ))}
    </NavbarItemsListContainer>
  );
};

export default NavbarItemsList;
