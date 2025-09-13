"use server";
import { getUserData } from "@/lib/get-user-data";
import HeaderClient from "@/components/header/header-client";

async function Header() {
  const userData = await getUserData();
  if (!userData) return null;

  return (
    <HeaderClient name={userData.name ?? userData.email} role={userData.role} />
  );
}

export default Header;
