import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { MuiProvider } from './mui.provider';

export default async function AppProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <MuiProvider>{children}</MuiProvider>
    </NextIntlClientProvider>
  );
}
