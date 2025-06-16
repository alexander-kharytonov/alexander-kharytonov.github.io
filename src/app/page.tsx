import { useTranslations } from 'next-intl';
import { Typography } from '@mui/material';

export default function RootPage() {
  const t = useTranslations('navigation');

  return <Typography sx={{ opacity: 0 }}>{t('Home')}</Typography>;
}
