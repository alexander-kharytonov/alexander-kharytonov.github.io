import type { Metadata, Viewport } from 'next';
import { Roboto } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import { InitColorSchemeScript } from '@mui/material';
import AppProvider from '@/providers/app.provider';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['cyrillic', 'latin', 'math'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Alexander Kharytonov — CV',
  description: 'Experience, skills, projects, contacts.',
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
    description: 'Experience, skills, projects, contacts.',
    url: 'https://alexander-kharytonov.vercel.app',
    siteName: 'Alexander Kharytonov — CV',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Alexander Kharytonov — CV',
      },
      {
        url: '/apple-icon.png',
        width: 192,
        height: 192,
        alt: 'Alexander Kharytonov — CV',
      },
    ],
    type: 'website',
  },
};

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
