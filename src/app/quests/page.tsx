import { Box, Container, Divider, Grid } from "@mui/material";
import CompleteQuestsPaper from "app/components/complete-quests-paper";
import DailyPaper from "app/components/daily-paper";
import ProgressPaper from "app/components/progress-paper";
import Quests from "app/components/quests";
import { getQuests } from "lib/data-layer/quests";

async function getStreaksQuests() {
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          title: "Astronaut",
          logoUrl: "/images/quests/placeholder_1.jpg",
        },
        {
          title: "Astronaut",
          logoUrl: "/images/quests/placeholder_2.jpg",
        },
        {
          title: "Astronaut",
          logoUrl: "/images/quests/placeholder_3.jpg",
        },
        {
          title: "Astronaut",
          logoUrl: "/images/quests/placeholder_4.jpg",
        },
        {
          title: "Astronaut",
          logoUrl: "/images/quests/placeholder_5.jpg",
        },
      ]);
    }, 1000);
  });

  return data as [];
}

async function getLatestQuests() {
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          title: "Project name",
          logoUrl: "/images/quests/placeholder_10.jpg",
        },
        {
          title: "Project name",
          logoUrl: "/images/quests/placeholder_11.jpg",
        },
        {
          title: "Project name",
          logoUrl: "/images/quests/placeholder_12.jpg",
        },
        {
          title: "Project name",
          logoUrl: "/images/quests/placeholder_4.jpg",
        },
        {
          title: "Project name",
          logoUrl: "/images/quests/placeholder_5.jpg",
        },
      ]);
    }, 1500);
  });

  return data as [];
}

export default async function Page(): Promise<React.ReactElement> {
  const [launchJoyQuests, streaksQuests, latestQuests] = await Promise.all([
    getQuests(),
    getStreaksQuests(),
    getLatestQuests(),
  ]);

  return (
    <>
      <Box component="section" sx={{ backgroundColor: "section.main" }}>
        <Container sx={{ py: { xs: 2, md: 6 } }}>
          <Grid container spacing={{ xs: 2, md: 4 }}>
            <Grid item xs={12} sm={5} md={6} display="flex">
              <CompleteQuestsPaper />
            </Grid>
            <Grid item xs={12} sm={7} md={6}>
              <Grid container spacing={{ xs: 2, md: 4 }}>
                <Grid item xs={12}>
                  <Grid
                    container
                    alignItems="stretch"
                    spacing={{ xs: 2, md: 4 }}
                  >
                    <Grid item xs={12} sm={6} display="flex">
                      <DailyPaper
                        animationDelay={0.2}
                        title="Daily"
                        subTitle="Level up to unlock exclusive quests."
                        image="partners"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} display="flex">
                      <DailyPaper
                        animationDelay={0.4}
                        title="Joy Streak"
                        subTitle="Level up to unlock exclusive quests."
                        image="box"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <ProgressPaper
                    animationDelay={0.6}
                    userName="alexander.kharytonov"
                    points={755}
                    totalPoints={1531}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Divider />
      <Container sx={{ py: 4 }}>
        <Quests title="LaunchJoy Quests" quests={launchJoyQuests} />
        <Quests title="Streaks" quests={streaksQuests} />
        <Quests title="Latest Quests" quests={latestQuests} />
      </Container>
    </>
  );
}
