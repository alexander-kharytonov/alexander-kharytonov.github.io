'use client';

import { useState } from 'react';
import {
  SwipeableDrawer,
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
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        slotProps={{
          // backdrop: { invisible: true },
          paper: { elevation: 0, sx: { width: { xs: '100%', sm: 320 } } },
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
      </SwipeableDrawer>
    </>
  );
}

export default function Navigation() {
  return <div>Navigation</div>;
}
