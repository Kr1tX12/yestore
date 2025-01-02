export type NavbarItem = {
  label: string;
  href: string;
};

export type NavbarItemForm =
  | NavbarItem
  | {
      action: (formData: FormData) => void | Promise<void>;
    };

export const navbarItems: NavbarItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
];
