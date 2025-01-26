"use client";

import { getCurrentUser } from "@/lib/actions/user.actions";
import { Models } from "node-appwrite";
import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext<any>(null);
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Models.Document | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };

    fetchUser();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser: () => Models.Document | null = () => {
  return useContext(UserContext);
};