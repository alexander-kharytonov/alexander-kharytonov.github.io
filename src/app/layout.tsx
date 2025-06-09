import type { Viewport } from 'next';
import { Roboto } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import { InitColorSchemeScript } from '@mui/material';
import AppProvider from '@/providers/app.provider';
import { type Locale, LOCALES, DEFAULT_LOCALE } from '@/constants/locale';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['cyrillic', 'latin', 'math'],
  display: 'swap',
  variable: '--font-roboto',
});

const META_BY_LOCALE = {
  ru: {
    title: 'Александр Харитонов — CV',
    description: 'Александр Харитонов: опыт, навыки, проекты, контакты.',
    keywords: [
      'Александр Харитонов',
      'резюме',
      'web',
      'react',
      'typescript',
      'cv',
      'resume',
      'frontend',
      'developer',
    ],
    openGraph: {
      title: 'Александр Харитонов — CV',
      description: 'Александр Харитонов: опыт, навыки, проекты, контакты.',
      url: 'https://alexander-kharytonov.vercel.app',
      siteName: 'Александр Харитонов — CV',
      images: [
        {
          url: '/apple-icon.png',
          width: 192,
          height: 192,
          alt: 'Александр Харитонов',
        },
      ],
      locale: 'ru_RU',
      type: 'website',
    },
  },
  en: {
    title: 'Alexander Kharytonov — CV',
    description:
      'Alexander Kharytonov: experience, skills, projects, contacts.',
    keywords: [
      'Alexander Kharytonov',
      'web',
      'react',
      'typescript',
      'cv',
      'resume',
      'frontend',
      'developer',
    ],
    openGraph: {
      title: 'Alexander Kharytonov — CV',
      description:
        'Alexander Kharytonov: experience, skills, projects, contacts.',
      url: 'https://alexander-kharytonov.vercel.app',
      siteName: 'Alexander Kharytonov — CV',
      images: [
        {
          url: '/apple-icon.png',
          width: 192,
          height: 192,
          alt: 'Alexander Kharytonov',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
  },
};

export async function generateMetadata() {
  const locale = await getLocale();

  return META_BY_LOCALE[
    LOCALES.includes(locale as Locale) ? (locale as Locale) : DEFAULT_LOCALE
  ];
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta
          name="apple-mobile-web-app-title"
          content="Alexander Kharytonov"
        />
      </head>
      <body className={roboto.variable}>
        <InitColorSchemeScript
          attribute="[data-theme='%s']"
          defaultMode="system"
        />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
