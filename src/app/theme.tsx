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
      main: "#5e5e5e",
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
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "24px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "initial",
          whiteSpace: "nowrap",
        },
      },
    },
  },
});

export default function Provider({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
