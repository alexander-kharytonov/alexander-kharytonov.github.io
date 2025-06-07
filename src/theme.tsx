'use client';

import { createTheme } from '@mui/material/styles';

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
});

export default theme;
