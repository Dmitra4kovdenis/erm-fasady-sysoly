"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";
import "dayjs/locale/ru";
import dayjs from "dayjs";

dayjs.locale("ru");

const theme = createTheme({
  palette: {
    primary: {
      main: "#2C2C2C", // переопределяем главный цвет primary
    },
    secondary: {
      main: "#f43f5e",
    },
    info: {
      main: "#7c7c7c",
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
        sizeSmall: {
          padding: "8px 16px", // вертикаль + горизонталь
          fontSize: "12px",
          textTransform: "initial",
          whiteSpace: "nowrap",
        },
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
