'use client';

import _ from 'lodash';
import { useTranslations } from 'next-intl';
import { IconButton, Tooltip, useColorScheme } from '@mui/material';
import {
  Brightness6 as Brightness6Icon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from '@mui/icons-material';
import { useCallback } from 'react';

const MODES = ['system', 'light', 'dark'] as const;

export default function ThemeSwitcher() {
  const t = useTranslations('theme');
  const { mode, setMode } = useColorScheme();

  const handleSetMode = useCallback(() => {
    if (!mode) return;

    setMode(MODES[(_.indexOf(MODES, mode) + 1) % _.size(MODES)]);
  }, [mode, setMode]);

  const { icon, title } = {
    system: { icon: <Brightness6Icon />, title: t('System') },
    light: { icon: <LightModeIcon />, title: t('Light') },
    dark: { icon: <DarkModeIcon />, title: t('Dark') },
  }[mode ?? 'system'];

  return (
    <Tooltip title={title}>
      <IconButton
        color="inherit"
        onClick={handleSetMode}
        disabled={!mode}
        loading={!mode}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
}
