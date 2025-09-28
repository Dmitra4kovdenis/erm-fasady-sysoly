"use order-detail";
import HeaderClient from "@/components/header/header-client";
import { getUserData } from "@/prisma-helpers/get-user-data";

async function Header() {
  const userData = await getUserData();
  if (!userData) return null;

  return (
    <HeaderClient
      name={userData.name ?? userData.login}
      role={userData.role.title}
    />
  );
}

export default Header;
