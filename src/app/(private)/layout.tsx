import { ReactNode } from "react";
import Header from "@/components/header/header";
import { Box } from "@mui/material";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box pt={16} pb={16}>
      <Header />
      {children}
    </Box>
  );
};

export default Layout;
