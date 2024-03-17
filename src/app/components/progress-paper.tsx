"use client";

import _ from "lodash";
import Image from "next/image";
import { motion } from "framer-motion";
import { Box, Divider, Paper, Stack, Typography, styled } from "@mui/material";
import { StarPoint as StarPointIcon } from "lib/icons";
import { StyledLinearProgress } from "app/components/styled";
import Tilt from "react-parallax-tilt";
import { useThemeContext } from "lib/providers/mui.providers";

const StyledPaper = styled(Paper)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2, 2.5),
  borderRadius: 12,
  height: "100%",

  ".preview": {
    position: "absolute",
    top: "45%",
    maxWidth: "40%",
    right: 0,

    img: {
      display: "block",
      width: "100%",
      height: "auto",
    },
  },
}));

export default function ProgressPaper({
  userName,
  points,
  totalPoints,
  animationDelay = 0,
}: {
  userName: string;
  points: number;
  totalPoints: number;
  animationDelay?: number;
}): React.ReactElement {
  const { mode } = useThemeContext();

  return (
    <Box
      component={motion.div}
      initial="offscreen"
      variants={{
        offscreen: {
          opacity: 0,
          scale: 0,
        },
        onscreen: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            bounce: 0.4,
            duration: 0.4,
            delay: animationDelay,
            type: "spring",
          },
        },
      }}
      viewport={{
        once: true,
        amount: 0.1,
      }}
      whileInView="onscreen"
      sx={{ flex: 1 }}
    >
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
        style={{ width: "100%", height: "100%" }}
      >
        <StyledPaper elevation={0}>
          <motion.div
            initial="offscreen"
            variants={{
              offscreen: {
                opacity: 0,
                scale: 0,
                y: "-50%",
              },
              onscreen: {
                opacity: 1,
                scale: 1,
                y: "-50%",
                transition: {
                  bounce: 0.4,
                  duration: 0.4,
                  type: "spring",
                },
              },
            }}
            viewport={{
              once: true,
              amount: 0.1,
            }}
            whileInView="onscreen"
            className="preview"
          >
            <Image
              src="/images/progress.png"
              width={237}
              height={151}
              alt="My progress"
              priority={true}
            />
          </motion.div>
          <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2.5}
            sx={{ flex: 1, position: "relative" }}
          >
            <Typography variant="body1">My progress</Typography>
            <Stack spacing={1.5} sx={{ maxWidth: "100%" }}>
              <Stack
                direction="row"
                alignItems="center"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
              >
                <Typography variant="body2" title={userName} noWrap>
                  {userName}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <StarPointIcon sx={{ color: "transparent" }} />
                  <Typography
                    variant="body2"
                    sx={{ whiteSpace: "nowrap" }}
                  >{`${points} / ${totalPoints} POINTs`}</Typography>
                </Stack>
              </Stack>
              <StyledLinearProgress
                variant="determinate"
                value={Math.round((points / totalPoints) * 100)}
              />
            </Stack>
          </Stack>
        </StyledPaper>
      </Tilt>
    </Box>
  );
}
