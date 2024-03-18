import type { Metadata } from "next";
import { headers } from "next/headers";
import { State, cookieToInitialState } from "wagmi";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Stack } from "@mui/material";
import { wagmiConfig } from "lib/configs/wagmi.config";
import { WagmiProviders } from "lib/providers/wagmi.providers";
import { UserProviders } from "lib/providers/user.providers";
import { ThemeProviders } from "lib/providers/mui.providers";
import Header from "app/components/header";
import Footer from "app/components/footer";

export const metadata: Metadata = {
  title: "LaunchJoy - Main",
};

export const dynamic = "force-static";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  const initialState = cookieToInitialState(
    wagmiConfig,
    headers().get("cookie")
  ) as State;

  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <WagmiProviders initialState={initialState}>
            <UserProviders>
              <ThemeProviders>
                <Stack direction="column" sx={{ minHeight: "100vh" }}>
                  <Header />
                  {children}
                  <Footer />
                </Stack>
              </ThemeProviders>
            </UserProviders>
          </WagmiProviders>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
