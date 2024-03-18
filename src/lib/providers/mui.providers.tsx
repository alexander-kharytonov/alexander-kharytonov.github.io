"use client";

import _ from "lodash";
import { Sora } from "next/font/google";
import { createContext, useContext, useMemo } from "react";
import {
  createTheme,
  CssBaseline,
  IconButton,
  PaletteMode,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { SnackbarProvider, closeSnackbar } from "notistack";
import useLocalStorage from "lib/hooks/useLocalStorage";

const sora = Sora({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const ThemeContext = createContext({
  mode: "",
  toggleTheme: () => {},
});

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (_.isUndefined(context)) {
    throw new Error("Context must be used within a Provider");
  }

  return context;
};

function getDesignTokens(mode: PaletteMode): ThemeOptions {
  return {
    breakpoints: {
      values: {
        xs: 0,
        sm: 628,
        md: 928,
        lg: 1328,
        xl: 1536,
      },
    },
    palette:
      mode === "dark"
        ? {
            mode,
            primary: { main: "#FFDE68", contrastText: "#21262F" },
            secondary: { main: "#21262F" },
            success: { main: "#5EC07F" },
            section: { main: "#1A1C21" },
            footer: { main: "#2D333F" },
            quest: { main: "#292F3A" },
            background: { paper: "#2D333F", default: "#21262F" },
            text: { primary: "#FFFCF5" },
          }
        : {
            mode,
            primary: { main: "#FFDE68", contrastText: "#21262F" },
            secondary: { main: "#21262F" },
            success: { main: "#5EC07F" },
            section: { main: "#EBE6D7" },
            footer: { main: "#EBE6D7" },
            quest: { main: "#F7F3E9" },
            background: { paper: "#F7F3E9", default: "#FFFCF5" },
            text: { primary: "#21262F" },
          },
    typography: {
      fontFamily: sora.style.fontFamily,
      h3: {
        fontWeight: 600,
        fontSize: "1.5rem",
      },
      h4: {
        fontWeight: 800,
        fontSize: "1.325rem",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: () => ({
            textTransform: "none",
            boxShadow: "none",
            borderRadius: 40,

            "&:hover": {
              boxShadow: "none",
            },
          }),
        },
      },
      MuiFab: {
        styleOverrides: {
          root: () => ({
            boxShadow: "none",

            "&:hover": {
              boxShadow: "none",
            },
          }),
        },
      },
    },
  };
}

export function ThemeProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  const [mode, updateMode] = useLocalStorage<PaletteMode>(
    "mui:theme:mode",
    "dark"
  );

  const value = useMemo(
    () => ({
      mode,
      toggleTheme: () => {
        updateMode((prevState) => (prevState === "light" ? "dark" : "light"));
      },
    }),
    [mode, updateMode]
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider
          action={(snackbarId) => (
            <IconButton
              color="inherit"
              onClick={() => closeSnackbar(snackbarId)}
              size="small"
              aria-label="Close snackbar"
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          )}
        >
          {children}
        </SnackbarProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
