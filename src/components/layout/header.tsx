import { AppBar, Stack, Toolbar } from '@mui/material';
import ThemeSwitcher from '@/components/theme-switcher';
import LocaleSwitcher from '@/components/locale-switcher';

export default function Header() {
  return (
    <AppBar elevation={0} color="transparent" position="sticky">
      <Toolbar>
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ ml: 'auto' }}
        >
          <ThemeSwitcher />
          <LocaleSwitcher />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
