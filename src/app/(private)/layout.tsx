import { ReactNode } from "react";
import Header from "@/components/header/header";
import { Box } from "@mui/material";
import { UserDataProvider } from "@/prisma-helpers/user-data/user-data.provider";
import { getUserData } from "@/prisma-helpers/get-user-data";

const Layout = async ({ children }: { children: ReactNode }) => {
  const userData = await getUserData();

  if (!userData) return null;

  return (
    <UserDataProvider userData={userData}>
      <Box pt={16} pb={16}>
        <Header />
        {children}
      </Box>
    </UserDataProvider>
  );
};

export default Layout;
