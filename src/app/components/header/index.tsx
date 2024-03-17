"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import {
  AppBar,
  Box,
  Container,
  Divider,
  Stack,
  Tab,
  Toolbar,
} from "@mui/material";
import Logo from "app/components/logo";
import { StyledTabs } from "app/components/styled";
import Application from "./application";
import Connectors from "./connectors";
import Wallet from "./wallet";
import ModeSwitcher from "./mode-switcher";

export default function Header(): React.ReactElement {
  const { address, isConnected } = useAccount();
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, value: string) => {
    event.preventDefault();

    router.push(value, { scroll: false });
  };

  return (
    <>
      <AppBar position="static" elevation={0} color="transparent">
        <Container>
          <Toolbar disableGutters>
            <Logo />
            <StyledTabs
              value={pathname.replace(/^\/([^\/]+)\/(.*)$/, "/$1")}
              onChange={handleChange}
              sx={{
                mx: "auto",
                alignSelf: "stretch",
                display: { xs: "none", md: "flex" },
              }}
              textColor="inherit"
            >
              <Tab label="Main" value="/" />
              <Tab label="Quests" value="/quests" />
              <Tab label="Launch Pad" disabled />
              <Tab label="About" value="/about" />
            </StyledTabs>
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
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Divider />
    </>
  );
}
