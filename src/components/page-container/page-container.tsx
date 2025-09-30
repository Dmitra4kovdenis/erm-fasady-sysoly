import { ReactNode } from "react";
import { Container } from "@mui/material";

interface PageContainerProps {
  children: ReactNode;
  size?: "l" | "m";
}

export function PageContainer({ children, size = "l" }: PageContainerProps) {
  return (
    <Container
      sx={{
        px: "24px",
        maxWidth: size === "l" ? "1400px!important" : "1000px!important",
      }}
    >
      {children}
    </Container>
  );
}
