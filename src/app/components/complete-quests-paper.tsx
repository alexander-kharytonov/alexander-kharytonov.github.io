"use client";

import _ from "lodash";
import Image from "next/image";
import { motion } from "framer-motion";
import { Box, Button, Paper, Stack, Typography, styled } from "@mui/material";
import { East as EastIcon } from "@mui/icons-material";
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
    maxWidth: "100%",
    height: "auto",
  },
}));

export default function CompleteQuestsBox(): React.ReactElement {
  const { mode } = useThemeContext();

  return (
    <Box
      component={motion.div}
      initial="offscreen"
      variants={{
        offscreen: {
          opacity: 0,
          scale: 0,
          x: 100,
        },
        onscreen: {
          opacity: 1,
          x: 0,
          scale: 1,
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
        <StyledPaper
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "stretch",
            justifyContent: "stretch",
            flexDirection: "column",
            padding: { xs: 2, md: 4 },
          }}
        >
          <Box
            component={motion.div}
            initial="offscreen"
            variants={{
              offscreen: {
                opacity: 0,
                scale: 0.9,
                x: -200,
              },
              onscreen: {
                opacity: 1,
                scale: 1,
                x: 0,
                transition: {
                  bounce: 0.4,
                  duration: 0.4,
                  delay: 0.1,
                  type: "spring",
                },
              },
            }}
            viewport={{
              once: true,
              amount: 0.1,
            }}
            whileInView="onscreen"
            display="flex"
            alignItems="center"
            sx={{
              marginTop: { xs: -3, md: -9 },
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Image
              src="/images/joystick.png"
              width={436}
              height={202}
              alt="Complete quests to earn XP and compete!"
              priority={true}
              className="preview"
            />
          </Box>
          <Stack
            direction="column"
            spacing={2}
            sx={{ marginTop: "auto", position: "relative" }}
          >
            <Typography
              component={motion.div}
              initial="offscreen"
              variants={{
                offscreen: {
                  opacity: 0,
                  x: -80,
                },
                onscreen: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    bounce: 0.4,
                    duration: 0.4,
                    delay: 0.3,
                    type: "spring",
                  },
                },
              }}
              viewport={{
                once: true,
                amount: 0.1,
              }}
              whileInView="onscreen"
              variant="h6"
              sx={{ fontSize: "1.15rem" }}
            >
              Complete quests to earn XP and compete!
            </Typography>
            <motion.div
              initial="offscreen"
              variants={{
                offscreen: {
                  opacity: 0,
                  x: -80,
                },
                onscreen: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    bounce: 0.4,
                    duration: 0.4,
                    delay: 0.5,
                    type: "spring",
                  },
                },
              }}
              viewport={{
                once: true,
                amount: 0.1,
              }}
              whileInView="onscreen"
            >
              <Button
                onClick={(event) => console.log(event)}
                variant="contained"
                color="secondary"
                sx={{ minWidth: "50%", width: { xs: "100%", md: "auto" } }}
                endIcon={<EastIcon />}
              >
                View leaderboard
              </Button>
            </motion.div>
          </Stack>
        </StyledPaper>
      </Tilt>
    </Box>
  );
}
