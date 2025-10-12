"use client";
import { createContext, ReactNode, useContext } from "react";
import { GetUserData } from "@/prisma-helpers/user-data/get-user-data";

interface UserData {
  role: "admin" | "worker" | "customer";
  name: string;
  login: string;
  roleTitle: string;
  userId: number;
}

const Context = createContext<UserData>({} as any);

export const UserDataProvider = ({
  children,
  userData,
}: {
  children: ReactNode;
  userData: NonNullable<GetUserData>;
}) => {
  const name =
    userData.worker?.name ??
    userData.admin?.name ??
    userData.customer?.name ??
    "";

  const role =
    userData.roleId === 0
      ? "admin"
      : userData.roleId === 2
        ? "worker"
        : "customer";

  return (
    <Context.Provider
      value={{
        name,
        role,
        login: userData.login,
        roleTitle: userData.role.title,
        userId: userData.id,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useUserData = () => useContext(Context);
