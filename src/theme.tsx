'use client';

import {
  createTheme,
  CssVarsThemeOptions,
  Palette,
  Theme,
  useColorScheme,
  useTheme,
} from '@mui/material/styles';

export function usePalette(): Palette {
  const theme = useTheme<Theme & CssVarsThemeOptions>();
  const { mode = 'system', systemMode } = useColorScheme();

  const currentMode: 'light' | 'dark' =
    mode === 'system'
      ? systemMode === 'dark'
        ? 'dark'
        : 'light'
      : mode === 'dark'
        ? 'dark'
        : 'light';

  const colorSchemes = (
    theme as unknown as {
      colorSchemes?: Record<'light' | 'dark', { palette: Palette }>;
    }
  ).colorSchemes;

  const palette =
    colorSchemes && colorSchemes[currentMode]
      ? colorSchemes[currentMode].palette
      : theme.palette;

  return palette;
}

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#4cc9f0' },
        secondary: { main: '#f72585' },
        background: { default: '#f1f1f1', paper: '#f5f5f5' },
        text: { primary: '#212121', secondary: '#616161' },
      },
    },
    dark: {
      palette: {
        primary: { main: '#4cc9f0' },
        secondary: { main: '#f72585' },
        background: { default: '#0f1117', paper: '#1a1c23' },
        text: { primary: '#e0e0e0', secondary: '#9e9e9e' },
      },
    },
  },
  cssVariables: {
    colorSchemeSelector: 'data-theme',
  },
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: ({ theme }) => ({
          [theme.breakpoints.up('xs')]: {
            minHeight: theme.spacing(9),
          },
        }),
      },
    },
  },
});

export default theme;
