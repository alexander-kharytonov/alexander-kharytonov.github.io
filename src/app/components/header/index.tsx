"use client";

import { useAccount } from "wagmi";
import { AppBar, Box, Container, Divider, Stack, Toolbar } from "@mui/material";
import Logo from "app/components/logo";
import { Navigation, NavigationDrawer } from "./navigation";
import Application from "./application";
import Connectors from "./connectors";
import Wallet from "./wallet";
import ModeSwitcher from "./mode-switcher";

export default function Header(): React.ReactElement {
  const { address, isConnected } = useAccount();

  return (
    <>
      <AppBar position="static" elevation={0} color="transparent">
        <Container>
          <Toolbar disableGutters>
            <Logo />
            <Navigation />
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ ml: "auto" }}
            >
              <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                {address && <Wallet address={address} />}
              </Box>
              <ModeSwitcher />
              {isConnected ? <Application /> : <Connectors />}
              <NavigationDrawer />
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Divider />
    </>
  );
}
