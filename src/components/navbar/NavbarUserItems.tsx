import React from "react";
import NavbarItemsListContainer from "./NavbarItemsListContainer";
import { NavbarItem, NavbarItemForm } from "./NavbarConstants";
import UserProfile from "../user/DropdownUserProfile";
import { NavbarItemLink } from "./NavbarItems";

const isLoggedIn = false;
const NavbarUserItems = () => {
  return (
    <NavbarItemsListContainer>
      {isLoggedIn ? (
        <UserProfile />
      ) : (
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
      )}
    </NavbarItemsListContainer>
  );
};

export default NavbarUserItems;
