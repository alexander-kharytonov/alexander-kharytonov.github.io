import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import Header from '@/components/layout/header';
import theme from '@/theme';

export function MuiProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme} defaultMode="system">
        <CssBaseline />
        <Header />
        <Container
          component={Box}
          display="flex"
          flexDirection="column"
          maxWidth={false}
        >
          {children}
        </Container>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
