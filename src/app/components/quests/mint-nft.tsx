"use client";

import { useCallback, useState } from "react";
import { Alert, Stack } from "@mui/material";
import {
  type BaseError,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { enqueueSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import { mintNFTs } from "lib/data-layer/quests";
import { useUserContext } from "lib/providers/user.providers";

export default function MintNFT({
  questId,
}: {
  questId: number;
}): React.ReactElement {
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { id: userId } = useUserContext();
  const [loading, updateLoading] = useState(false);

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const handleClick = useCallback(() => {
    async function varifayTask(parameters: {
      userId: number;
      questId: number;
    }) {
      updateLoading(true);

      try {
        const {
          message,
          contractAddress: address,
          signature,
        } = await mintNFTs(parameters);

        writeContract({
          address,
          abi: [
            {
              name: "mint",
              type: "function",
              stateMutability: "nonpayable",
              inputs: [
                { internalType: "string", name: "message", type: "string" },
                { internalType: "bytes", name: "signature", type: "bytes" },
              ],
              outputs: [],
            },
          ],
          functionName: "mint",
          args: [message, signature],
        });
      } catch (error) {
        if (error instanceof Error) {
          enqueueSnackbar(error.message, { variant: "error" });
        }
      } finally {
        updateLoading(false);
      }
    }

    if (userId) {
      varifayTask({ userId, questId });
    }
  }, [questId, userId, writeContract]);

  return (
    <Stack spacing={2}>
      {hash && (
        <Alert severity="info" style={{ wordWrap: "break-word" }}>
          Transaction hash: {hash}
        </Alert>
      )}
      {isConfirming && (
        <Alert severity="info">Waiting for confirmation...</Alert>
      )}
      {isConfirmed && <Alert severity="success">Transaction confirmed.</Alert>}
      {error && (
        <Alert severity="error">
          {(error as BaseError).shortMessage || error.message}
        </Alert>
      )}
      <LoadingButton
        loading={loading || isPending}
        onClick={handleClick}
        color="success"
        variant="contained"
        sx={{ minWidth: "50%", position: "relative", zIndex: 1 }}
      >
        {isPending ? "Confirming..." : "Mint NFT"}
      </LoadingButton>
    </Stack>
  );
}
