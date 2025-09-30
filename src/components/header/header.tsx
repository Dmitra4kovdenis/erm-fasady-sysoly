"use server";
import HeaderClient from "@/components/header/header-client";
import { getUserData } from "@/prisma-helpers/get-user-data";

async function Header() {
  const userData = await getUserData();
  if (!userData) return null;

  const name =
    userData.worker?.name ??
    userData.admin?.name ??
    userData.customer?.name ??
    userData.login;

  return <HeaderClient name={name} role={userData.role.title} />;
}

export default Header;
