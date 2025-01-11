"use client";

import React from "react";
import Logo from "../NavbarLogo";
import NavbarItemsList from "./NavbarItemsList";
import { navbarItems } from "./NavbarConstants";
import NavbarUserItems from "./NavbarUserItems";

const Navbar = () => {
  return (
    <>
      <Header>
        <Nav>
          <Logo />
          <NavbarItemsList items={navbarItems} />
          <NavbarUserItems />
        </Nav>
      </Header>
    </>
  );
};

// Доп компоненты Header и Nav

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-transparent z-[100] h-10 border-zinc-900 border backdrop-blur-sm fix-scrollbar">
      {children}
    </header>
  );
};

const Nav = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav className="flex justify-center xl:gap-96 md:gap-56 max-md:justify-between items-center px-4 py-2 h-full">
      {children}
    </nav>
  );
};

export default Navbar;
