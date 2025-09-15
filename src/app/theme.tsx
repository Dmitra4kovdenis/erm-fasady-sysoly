"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2C2C2C", // переопределяем главный цвет primary
    },
    secondary: {
      main: "#f43f5e",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "32px",
      fontWeight: 700,
      marginBottom: "32px",
    },
  },
  shape: {
    borderRadius: 8, // радиусы
  },
  components: {
    MuiButton: {
      styleOverrides: {
        sizeMedium: {
          padding: "12px 32px", // вертикаль + горизонталь
          fontSize: "16px",
          textTransform: "initial",
        },
      },
    },
  },
});

export default function Provider({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
