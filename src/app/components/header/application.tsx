"use client";

import _ from "lodash";
import { BaseError, Chain } from "viem";
import { useAccount, useChainId, useDisconnect, useSwitchChain } from "wagmi";
import {
  Button,
  Fab,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  ContentPaste as ContentPasteIcon,
  Launch as LaunchIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";
import { Application as ApplicationIcon } from "lib/icons";
import { useState } from "react";
import { useUserContext } from "lib/providers/user.providers";

export function WalletInformtaion({
  handleClose,
}: Readonly<{ handleClose: Function }>): React.ReactElement {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { chains, switchChain } = useSwitchChain({
    mutation: {
      onSuccess: () => {
        enqueueSnackbar("The network was successfully switched!", {
          variant: "success",
        });
      },
      onError: (error) => {
        const { details } = error as BaseError;

        enqueueSnackbar(details, { variant: "error" });
      },
    },
  });
  const { reset } = useUserContext();

  const chainId = useChainId();

  async function handleCopyAddress() {
    if (!address) {
      return;
    }

    try {
      await navigator.clipboard.writeText(address);

      enqueueSnackbar("The address was successfully copied to the clipboard!", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(`Failed to copy the address to the clipboard: ${error}`, {
        variant: "error",
      });
    }
  }

  const { name: currentNetwork } = _.find(chains, { id: chainId }) as Chain;

  return (
    <Stack spacing={2}>
      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h6">Your wallet</Typography>
        <Button
          endIcon={<LaunchIcon fontSize="small" />}
          href={`https://bscscan.com/address/${address}`}
          target="_blank"
          title="View on BscScan"
          size="small"
          sx={{ textTransform: "none", px: 2 }}
        >
          View on BscScan
        </Button>
      </Stack>
      <TextField
        id="WALLET_ID"
        label="Wallet ID"
        variant="outlined"
        value={address}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                color="inherit"
                onClick={handleCopyAddress}
                size="small"
                edge="end"
              >
                <ContentPasteIcon fontSize="inherit" />
              </IconButton>
            </InputAdornment>
          ),
        }}
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel id="CURRENT_NETWORK_LABEL">Current network</InputLabel>
        <Select
          labelId="CURRENT_NETWORK_LABEL"
          value={currentNetwork}
          label="Current network"
          renderValue={(value) => value}
        >
          {_.map(chains, (chain) => {
            const { nativeCurrency } = chain;

            return (
              <MenuItem
                key={chain.id}
                disabled={chain.id === chainId}
                selected={chain.id === chainId}
                onClick={() => {
                  handleClose();
                  switchChain({ chainId: chain.id });
                }}
                value={chain.name}
              >
                <ListItemText
                  primary={chain.name}
                  secondary={`Native currency: ${nativeCurrency.symbol}`}
                />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Button
        endIcon={<LogoutIcon fontSize="small" />}
        onClick={() => {
          reset();
          disconnect();
        }}
        color="error"
      >
        Disconnect
      </Button>
    </Stack>
  );
}

export default function Application(): React.ReactElement {
  const [buttonRef, updateButtonRef] = useState<null | HTMLElement>(null);
  const open = Boolean(buttonRef);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    updateButtonRef(event.currentTarget);
  };

  const handleClose = () => {
    updateButtonRef(null);
  };

  return (
    <>
      <Fab
        size="medium"
        color="primary"
        onClick={handleClick}
        sx={{ flexShrink: 0, display: { xs: "none", md: "flex" } }}
      >
        <ApplicationIcon sx={{ color: "transparent" }} />
      </Fab>
      <Menu
        anchorEl={buttonRef}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        onClose={handleClose}
        open={open}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{ mt: 1.5 }}
      >
        <ListItem sx={{ whiteSpace: "nowrap" }}>
          <WalletInformtaion handleClose={handleClose} />
        </ListItem>
      </Menu>
    </>
  );
}
