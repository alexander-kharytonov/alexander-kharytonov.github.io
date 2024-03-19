"use client";

import _ from "lodash";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  Fab,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Tab,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  MenuOpen as MenuOpenIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
} from "@mui/icons-material";
import { StyledTabs } from "app/components/styled";
import Logo from "app/components/logo";
import { WalletInformtaion } from "./application";

const PERSONA_NAVIGATION = [
  { label: "Main", value: "/" },
  { label: "Quests", value: "/quests" },
  { label: "Launch Pad", disabled: true },
  { label: "About", value: "/about" },
];

export function Navigation(): React.ReactElement {
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, value: string) => {
    event.preventDefault();

    router.push(value, { scroll: false });
  };

  return (
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
      {_.map(PERSONA_NAVIGATION, (item, index) => (
        <Tab {...item} key={index} sx={{ sm: { alignItems: "left" } }} />
      ))}
    </StyledTabs>
  );
}
export function NavigationDrawer(): React.ReactElement {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleChange = (event: React.SyntheticEvent, value: string) => {
    event.preventDefault();

    setOpen(false);
    router.push(value, { scroll: false });
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <Fab
        size="medium"
        color="primary"
        onClick={toggleDrawer(true)}
        sx={{ flexShrink: 0, display: { xs: "flex", md: "none" } }}
      >
        {open ? <ArrowForwardIosIcon /> : <MenuOpenIcon />}
      </Fab>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            flexShrink: 0,
            width: { xs: "100%", sm: 360 },
          },
        }}
      >
        <AppBar position="static" elevation={0} color="transparent">
          <Toolbar>
            <Logo showTypography={false} />
            <IconButton
              onClick={toggleDrawer(false)}
              color="inherit"
              sx={{ ml: "auto" }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Divider />
        <Box sx={{ flexFlow: 1, overflow: "auto" }}>
          <Box sx={{ p: 2 }}>
            <WalletInformtaion handleClose={() => toggleDrawer(false)} />
          </Box>
          <Divider />
          <Typography variant="h6" sx={{ p: 2 }}>
            Navigation
          </Typography>
          <List component="nav" sx={{ pt: 0 }}>
            {_.map(PERSONA_NAVIGATION, ({ label, value, disabled }, index) => (
              <ListItemButton
                selected={
                  value === pathname.replace(/^\/([^\/]+)\/(.*)$/, "/$1")
                }
                disabled={disabled}
                onClick={(event) => {
                  if (value) {
                    handleChange(event, value);
                  }
                }}
                key={index}
              >
                <ListItemText primary={label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
