import { ReactNode } from "react";
import { Box } from "@mui/material";

interface PageContainerProps {
  children: ReactNode;
}

export function ScrollOverflow({ children }: PageContainerProps) {
  return (
    <Box overflow="auto" ml={"-24px"} mr={"-24px"} pl={"24px"} pr={"24px"}>
      {children}
    </Box>
  );
}
