"use client";

import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useThemeContext } from "lib/providers/mui.providers";
import { useUserContext } from "lib/providers/user.providers";
import { StarPoint as StarPointIcon } from "lib/icons";
import { Task as TaskType, checkTask } from "lib/data-layer/quests";
import { LoadingButton } from "@mui/lab";

export default function Task({
  id: taskId,
  description,
  points,
}: TaskType): React.ReactElement {
  const { completedTasksIDs, id: userId, updateUser } = useUserContext();
  const { mode } = useThemeContext();
  const [loading, updateLoading] = useState(false);

  const completed = _.includes(completedTasksIDs, taskId);

  const handleClick = useCallback(() => {
    async function varifayTask(parameters: { userId: number; taskId: number }) {
      updateLoading(true);

      try {
        const verified = await checkTask(parameters);

        if (verified) {
          updateUser();

          enqueueSnackbar("Task verified successfully!", {
            variant: "success",
          });
        } else {
          enqueueSnackbar("Task verified failed", {
            variant: "error",
          });
        }
      } catch (error) {
        console.error("Error varifaying task", error);
      } finally {
        updateLoading(false);
      }
    }

    if (userId) {
      varifayTask({ userId, taskId });
    }
  }, [taskId, updateUser, userId]);

  return (
    <Tilt
      perspective={1500}
      tiltEnable={false}
      glareEnable={true}
      glareMaxOpacity={0.25}
      glareBorderRadius="12px"
      transitionSpeed={1500}
      glareColor={mode === "dark" ? "lightblue" : "#FFDE68"}
      glarePosition="all"
      scale={1.025}
    >
      <Stack component={Paper} spacing={2} sx={{ p: 3 }} elevation={0}>
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={completed ? { opacity: 0.38 } : {}}
        >
          <Typography variant="body1">{description}</Typography>
          <StarPointIcon sx={{ color: "transparent" }} />
          <Typography
            variant="body1"
            style={{ whiteSpace: "nowrap" }}
          >{`${points} POINTs`}</Typography>
        </Stack>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
        >
          <Box display="flex" justifyContent="center">
            {completed ? (
              <Button
                variant="contained"
                disabled
                color="success"
                sx={{ minWidth: "50%", position: "relative", zIndex: 1 }}
              >
                Completed
              </Button>
            ) : (
              <LoadingButton
                loading={loading}
                disabled={!userId}
                onClick={handleClick}
                variant="contained"
                sx={{ minWidth: "50%", position: "relative", zIndex: 1 }}
              >
                Verify
              </LoadingButton>
            )}
          </Box>
        </motion.div>
      </Stack>
    </Tilt>
  );
}
