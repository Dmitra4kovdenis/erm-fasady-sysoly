import { ReactNode } from "react";
import Header from "@/components/header/header";
import { Box, Container } from "@mui/material";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box pt={16}>
      <Header />
      <Container maxWidth="lg">{children}</Container>
    </Box>
  );
};

export default Layout;
