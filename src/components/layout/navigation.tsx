'use client';

import { useState } from 'react';
import {
  Drawer,
  IconButton,
  type IconButtonProps,
  Stack,
  Toolbar,
} from '@mui/material';
import {
  Menu as MenuIcon,
  MenuOpen as MenuOpenIcon,
} from '@mui/icons-material';
import ThemeSwitcher from '@/components/theme-switcher';
import LocaleSwitcher from '@/components/locale-switcher';

export function MobileNavigation(props: IconButtonProps) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <IconButton
        color="inherit"
        onClick={toggleDrawer(true)}
        disabled={open}
        {...props}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        slotProps={{
          paper: { sx: { width: { xs: '100%', sm: 320 } } },
        }}
        aria-hidden={!open}
      >
        <Toolbar>
          <Stack spacing={2} direction="row" alignItems="center">
            <ThemeSwitcher />
            <LocaleSwitcher />
          </Stack>
          <IconButton
            color="inherit"
            onClick={toggleDrawer(false)}
            disabled={!open}
            sx={{ marginLeft: 'auto' }}
          >
            <MenuOpenIcon sx={{ transform: 'scaleX(-1)' }} />
          </IconButton>
        </Toolbar>
      </Drawer>
    </>
  );
}

export default function Navigation() {
  return <div>Navigation</div>;
}
