"use client";

import { Box, CircularProgress, Typography } from "@mui/material";

export function Loader() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap={"16px"}
      height="300px"
    >
      <CircularProgress />
      <Typography variant="h3">Загрузка</Typography>
    </Box>
  );
}
