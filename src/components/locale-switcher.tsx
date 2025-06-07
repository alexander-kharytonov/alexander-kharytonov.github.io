'use client';

import _ from 'lodash';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useTransition } from 'react';
import { Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { Translate as TranslateIcon } from '@mui/icons-material';
import { setUserLocale } from '@/i18n/locale';
import { type Locale, LOCALES } from '@/constants/locale';

export default function LocaleSwitcher() {
  const currentLocale = useLocale();
  const t = useTranslations();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isPending, startTransition] = useTransition();
  const open = Boolean(anchorEl);

  function handleClick(locale: Locale) {
    startTransition(() => setUserLocale(locale));
    handleClose();
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Tooltip title={t('settings.Change Language')}>
          <IconButton
            color="inherit"
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              setAnchorEl(event.currentTarget);
            }}
            disabled={isPending}
          >
            <TranslateIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        slotProps={{ paper: { elevation: 0 } }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        aria-hidden={!open}
      >
        {_.map(LOCALES, (locale) => (
          <MenuItem
            onClick={() => handleClick(locale)}
            disabled={locale === currentLocale}
            focusRipple
            key={locale}
          >
            {t(`languages.${locale}`)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
