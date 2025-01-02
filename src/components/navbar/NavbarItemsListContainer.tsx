import React from "react";

const NavbarItemsListContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="flex items-center gap-5">{children}</div>;
};

export default NavbarItemsListContainer;
