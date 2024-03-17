"use client";

import _ from "lodash";
import Image from "next/image";
import { motion } from "framer-motion";
import { Box, Button, Paper, Stack, Typography, styled } from "@mui/material";
import Tilt from "react-parallax-tilt";
import { useThemeContext } from "lib/providers/mui.providers";

const IMAGES = {
  box: {
    src: "/images/box.png",
    width: 48,
    height: 50,
  },
  partners: {
    src: "/images/partners.png",
    width: 60,
    height: 50,
  },
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2, 2.5),
  borderRadius: 12,
  height: "100%",

  ".preview": {
    position: "absolute",
    top: -16,
    right: 22,
  },
}));

export default function DailyPaper({
  subTitle,
  title,
  image,
  animationDelay = 0,
}: {
  subTitle?: string;
  title: string;
  image?: "box" | "partners";
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
        glareMaxOpacity={0.15}
        glareBorderRadius="12px"
        transitionSpeed={1500}
        glareColor={mode === "dark" ? "lightblue" : "#FFDE68"}
        glarePosition="all"
        scale={1.025}
        style={{ width: "100%", height: "100%" }}
      >
        <StyledPaper elevation={0}>
          {image && !_.isEmpty(IMAGES[image]) && (
            <Image
              alt={title}
              priority={true}
              className="preview"
              {...IMAGES[image]}
            />
          )}
          <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={1}
            sx={{ flex: 1, position: "relative" }}
          >
            <Box>
              <Typography variant="h6">{title}</Typography>
              {subTitle && (
                <Typography variant="caption">{subTitle}</Typography>
              )}
            </Box>
            <Button
              sx={{ position: "relative", zIndex: 1 }}
              onClick={(event) => console.log(event)}
              variant="contained"
              size="large"
              fullWidth
            >
              GM
            </Button>
          </Stack>
        </StyledPaper>
      </Tilt>
    </Box>
  );
}
