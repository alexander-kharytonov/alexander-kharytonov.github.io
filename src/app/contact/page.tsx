'use client';

import { useTranslations } from 'next-intl';
import { Typography, Stack } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';

export default function ContactPage() {
  const t = useTranslations('navigation');

  return (
    <AnimatePresence>
      <Stack
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        flexGrow={1}
      >
        <Typography>{t('Contact')}</Typography>
      </Stack>
    </AnimatePresence>
  );
}
