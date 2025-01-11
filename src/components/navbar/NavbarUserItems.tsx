import React from "react";
import NavbarItemsListContainer from "./NavbarItemsListContainer";
import UserProfile from "../user/DropdownUserProfile";
import { NavbarItemLink } from "./NavbarItems";
import { useUser } from "../auth/user-provider";
import { Loader2Icon } from "lucide-react";

const NavbarUserItems = () => {
  const user = useUser();
  const isLoggedIn: "yes" | "loading" | "no" =
    user === null ? "loading" : user === undefined ? "no" : "yes";

  return (
    <NavbarItemsListContainer>
      {
        {
          yes: <UserProfile />,
          no: (
            <>
              <NavbarItemLink
                navbarItem={{
                  label: "Sign in",
                  href: "/sign-in",
                }}
                isActivated={false}
              />
              <NavbarItemLink
                navbarItem={{
                  label: "Sign up",
                  href: "/sign-up",
                }}
                isActivated={false}
              />
            </>
          ),
          loading: <Loader2Icon className="animate-spin" />,
        }[isLoggedIn]
      }
    </NavbarItemsListContainer>
  );
};

export default NavbarUserItems;
