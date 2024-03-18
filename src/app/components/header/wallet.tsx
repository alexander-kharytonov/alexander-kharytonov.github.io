import _ from "lodash";
import { Address, Chain, formatUnits } from "viem";
import { useBalance, useChainId, useSwitchChain } from "wagmi";
import { Box, Divider, Skeleton, Stack, Typography } from "@mui/material";
import { StyledBadge } from "app/components/styled";
import { truncateAddress } from "lib/utils";

export default function Wallet({
  address,
}: {
  address: Address;
}): React.ReactElement {
  const { chains } = useSwitchChain();
  const chainId = useChainId();
  const { data: balance, isPending: isBalancePending } = useBalance({
    address,
  });

  const { name: currentNetwork } = _.find(chains, { id: chainId }) as Chain;

  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
    >
      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <Typography
          variant="caption"
          align="right"
          title={`Current network: ${currentNetwork}`}
          sx={{ opacity: 0.38 }}
        >
          {currentNetwork}
        </Typography>
        <StyledBadge overlap="circular" variant="dot">
          <Typography
            variant="caption"
            align="right"
            title={`Wallet ID: ${address}`}
            sx={{ whiteSpace: "nowrap" }}
          >
            {truncateAddress(address)}
          </Typography>
        </StyledBadge>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <Typography variant="caption" sx={{ opacity: 0.38 }}>
          Balance
        </Typography>
        <Typography variant="caption" sx={{ whiteSpace: "nowrap" }}>
          {isBalancePending ? (
            <Skeleton animation="wave" height={20} width={36} />
          ) : (
            `${formatUnits(balance!.value, balance!.decimals)} ${
              balance!.symbol
            }`
          )}
        </Typography>
      </Box>
    </Stack>
  );
}
