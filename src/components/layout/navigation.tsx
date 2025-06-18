'use client';

import _ from 'lodash';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import {
  Button,
  SwipeableDrawer,
  IconButton,
  type IconButtonProps,
  Stack,
  type StackProps,
  Toolbar,
  List,
  ListSubheader,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import {
  Menu as MenuIcon,
  MenuOpen as MenuOpenIcon,
} from '@mui/icons-material';
import ThemeSwitcher from '@/components/theme-switcher';
import LocaleSwitcher from '@/components/locale-switcher';
import { NAVIGATION } from '@/utils';
import { usePalette } from '@/theme';

function useNavigation() {
  const t = useTranslations('navigation');
  const pathname = usePathname();

  const navigation = _.chain(NAVIGATION)
    .map(({ title, href }) => ({
      title: t(title),
      href,
      disabled: href === pathname,
    }))
    .compact()
    .value();

  return navigation;
}

export function MobileNavigation(props: IconButtonProps) {
  const t = useTranslations('navigation');
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();

  const toggleDrawer =
    (value: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setOpen(value);
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
        <Stack spacing={2}>
          <List
            component="nav"
            subheader={
              <ListSubheader component="div">{t('Navigation')}</ListSubheader>
            }
            disablePadding
          >
            {_.map(navigation, ({ title, href, disabled }) => (
              <ListItemButton
                title={title}
                selected={disabled}
                onClick={() => {
                  if (disabled) return;

                  setOpen(false);
                  router.push(href);
                }}
                key={href}
              >
                <ListItemText primary={title} />
              </ListItemButton>
            ))}
          </List>
        </Stack>
      </SwipeableDrawer>
    </>
  );
}

export default function Navigation(props: StackProps) {
  const navigation = useNavigation();
  const { mode } = usePalette();

  return (
    <Stack direction="row" spacing={2} alignItems="center" {...props}>
      {_.map(navigation, ({ title, href, disabled }) => (
        <Button
          component={Link}
          title={title}
          href={href}
          color={mode === 'dark' ? 'primary' : 'inherit'}
          disabled={disabled}
          key={href}
          disableRipple
        >
          {title}
        </Button>
      ))}
    </Stack>
  );
}
