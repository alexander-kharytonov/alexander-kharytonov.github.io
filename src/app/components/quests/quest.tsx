import _ from "lodash";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Skeleton,
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
import { useUserContext } from "lib/providers/user.providers";
import { Quest as QuestType } from "lib/data-layer/quests";

const ADDITIONAL_STYLES = {
  width: {
    lg: "calc(20% - 16px)",
    md: "calc(25% - 15px)",
    sm: "calc(50% - 10px)",
    xs: "calc(100%)",
  },
};

export function QuestSkeleton(): React.ReactElement {
  return (
    <Box
      sx={{
        opacity: 0.5,
        ...ADDITIONAL_STYLES,
      }}
    >
      <StyledCard>
        <Skeleton variant="rectangular" height={250} />
        <CardContent sx={{ py: 1.5 }}>
          <Skeleton variant="rounded" height={24} sx={{ mb: 1.25 }} />
          <Skeleton variant="rounded" height={20} sx={{ mb: 1.5 }} />
          <Skeleton variant="rounded" animation="wave" height={5} />
        </CardContent>
        <CardActions sx={{ pt: 0, pb: 2, px: 2 }}>
          <Skeleton
            variant="rounded"
            width="100%"
            height={42}
            sx={{ mt: 0.9 }}
          />
        </CardActions>
      </StyledCard>
    </Box>
  );
}

export function Quest({
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
  const { id: userId, completedQuestIDs, completedTasksIDs } = useUserContext();

  const completed = _.includes(completedQuestIDs, id);
  const completedTasks = _.reduce(
    tasks,
    (memo, task) => (_.includes(completedTasksIDs, task.id) ? ++memo : memo),
    0
  );

  const tasksCount = _.size(tasks);
  const points = _.sumBy(tasks, "points");

  const handleChange = (event: React.SyntheticEvent, id: number) => {
    event.preventDefault();

    if (id) {
      router.push(`/quests/${id}`);
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
      sx={ADDITIONAL_STYLES}
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
            <CardMedia sx={{ height: 250 }} image={logoUrl} title={title} />
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
              variant="body1"
              component="div"
              gutterBottom
              noWrap
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
                  value={Math.round((completedTasks / tasksCount) * 100)}
                />
              </Box>
              <Typography variant="caption" sx={{ whiteSpace: "nowrap" }}>
                {`${completedTasks} / ${tasksCount}`}
              </Typography>
            </Box>
          </CardContent>
          <CardActions sx={{ pt: 0, pb: 2, px: 2 }}>
            <Button
              sx={{ position: "relative", zIndex: 1 }}
              onClick={(event) => handleChange(event, id)}
              disabled={!userId}
              size="large"
              color={completed ? "success" : "primary"}
              startIcon={
                <SystemIcon viewBox="0 0 20 20" sx={{ color: "transparent" }} />
              }
              variant="contained"
              fullWidth
            >
              {completed ? "Completed" : "Start a task"}
            </Button>
          </CardActions>
        </StyledCard>
      </Tilt>
    </Box>
  );
}
