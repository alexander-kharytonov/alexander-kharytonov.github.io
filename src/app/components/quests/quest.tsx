import _ from "lodash";
import { UUID } from "crypto";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ImageNotSupported as ImageNotSupportedIcon } from "@mui/icons-material";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { StyledLinearProgress, StyledCard } from "app/components/styled";
import { Star as StarIcon, System as SystemIcon } from "lib/icons";
import { useThemeContext } from "lib/providers/mui.providers";
import { Quest as QuestType } from "lib/data-layer/quests";

export default function Quest({
  id,
  index,
  logoUrl,
  tasks,
  title,
}: QuestType & {
  index: number;
}): React.ReactElement {
  const router = useRouter();
  const theme = useTheme();
  const { mode } = useThemeContext();

  const currentTask = _.size(_.filter(tasks, { completed: true }));
  const tasksCount = _.size(tasks);
  const points = _.sumBy(tasks, "points");

  const handleChange = (event: React.SyntheticEvent, id: UUID) => {
    event.preventDefault();

    if (id) {
      router.push(`/quests/${id}`, { scroll: false });
    } else {
      console.error("Quest ID is missing", event);
    }
  };

  const [sm, md, lg] = [
    useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true }),
    useMediaQuery(theme.breakpoints.up("md"), { noSsr: true }),
    useMediaQuery(theme.breakpoints.up("lg"), { noSsr: true }),
  ];

  function getDelay(): number {
    switch (true) {
      case lg:
        return (index % 5) / 10;
      case md:
        return (index % 4) / 10;
      case sm:
        return (index % 2) / 10;
      default:
        return 0;
    }
  }

  return (
    <Box
      component={motion.div}
      initial="offscreen"
      variants={{
        offscreen: {
          opacity: 0,
          scale: 0.9,
          y: 80,
        },
        onscreen: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: {
            bounce: 0.4,
            duration: 0.8,
            delay: getDelay(),
            type: "spring",
          },
        },
      }}
      viewport={{
        once: true,
        amount: 0.1,
      }}
      whileInView="onscreen"
      sx={{
        minWidth: {
          lg: "calc(20% - 16px)",
          md: "calc(25% - 16px)",
          sm: "calc(50% - 10px)",
          xs: "calc(100%)",
        },
      }}
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
      >
        <StyledCard>
          {logoUrl ? (
            <CardMedia
              sx={{ height: 250 }}
              image={logoUrl || "/images/quests/placeholder_10.jpg"}
              title={title}
            />
          ) : (
            <Box
              sx={{ height: 250 }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <ImageNotSupportedIcon
                style={{ width: 120, height: 120, maxWidth: "100%" }}
              />
            </Box>
          )}

          <CardContent sx={{ py: 1.5 }}>
            <Typography
              gutterBottom
              variant="body1"
              component="div"
              sx={{ fontWeight: 700, mb: 1.25 }}
            >
              {title}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={1}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <StarIcon viewBox="0 0 20 20" sx={{ fontSize: 18 }} />
                <Typography variant="body2">{points} POINTs</Typography>
              </Stack>
            </Stack>
            <Box display="flex" alignItems="center" sx={{ mt: 0.5 }}>
              <Box sx={{ width: "100%", mr: 1 }}>
                <StyledLinearProgress
                  variant="determinate"
                  value={Math.round((currentTask / tasksCount) * 100)}
                />
              </Box>
              <Typography variant="caption" sx={{ whiteSpace: "nowrap" }}>
                {`${currentTask} / ${tasksCount}`}
              </Typography>
            </Box>
          </CardContent>
          <CardActions sx={{ pt: 0, pb: 2, px: 2 }}>
            <Button
              sx={{ position: "relative", zIndex: 1 }}
              onClick={(event) => handleChange(event, id)}
              size="large"
              startIcon={
                <SystemIcon viewBox="0 0 20 20" sx={{ color: "transparent" }} />
              }
              variant="contained"
              fullWidth
            >
              Start a task
            </Button>
          </CardActions>
        </StyledCard>
      </Tilt>
    </Box>
  );
}
