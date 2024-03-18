"use client";

import { useCallback, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import { mintNFTs } from "lib/data-layer/quests";
import { useUserContext } from "lib/providers/user.providers";

export default function MintNFT({
  questId,
}: {
  questId: number;
}): React.ReactElement {
  const { completedTasksIDs, id: userId, updateUser } = useUserContext();
  const [loading, updateLoading] = useState(false);

  const handleClick = useCallback(() => {
    async function varifayTask(parameters: {
      userId: number;
      questId: number;
    }) {
      updateLoading(true);

      try {
        const { message, contractAddress, signature } = await mintNFTs(
          parameters
        );

        enqueueSnackbar(
          `${message} / Contract address: ${contractAddress} / Signature: ${signature}`,
          {
            variant: "success",
          }
        );
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
  }, [questId, userId]);

  return (
    <LoadingButton
      loading={loading}
      onClick={handleClick}
      color="success"
      variant="contained"
      sx={{ minWidth: "50%", position: "relative", zIndex: 1 }}
    >
      Mint NFT
    </LoadingButton>
  );
}
