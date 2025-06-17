'use client';

import { useTranslations } from 'next-intl';
import {
  AppBar,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Toolbar,
} from '@mui/material';
import ThemeSwitcher from '@/components/theme-switcher';
import LocaleSwitcher from '@/components/locale-switcher';
import { MobileNavigation } from './navigation';
import { getInitials } from '@/utils';

export default function Header() {
  const t = useTranslations('about');
  const displayName = t('name');

  return (
    <AppBar elevation={0} color="transparent" position="sticky">
      <Toolbar>
        <ListItem component="div" sx={{ mr: 'auto' }} disablePadding>
          <ListItemAvatar>
            <Avatar alt={displayName} sx={{ bgcolor: 'primary.main' }}>
              {getInitials(displayName)}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={displayName} secondary={t('profession')} />
        </ListItem>
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ display: { xs: 'none', md: 'flex' } }}
        >
          <ThemeSwitcher />
          <LocaleSwitcher />
        </Stack>
        <MobileNavigation sx={{ display: { xs: 'inline-flex', md: 'none' } }} />
      </Toolbar>
    </AppBar>
  );
}
