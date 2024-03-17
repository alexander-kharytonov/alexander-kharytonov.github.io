import { Box, Container, Divider, Grid, Skeleton } from "@mui/material";
import Quests from "app/components/quests";

export default function Loading(): React.ReactElement {
  return (
    <>
      <Box component="section" sx={{ backgroundColor: "section.main" }}>
        <Container sx={{ py: { xs: 2, md: 6 } }}>
          <Skeleton variant="rounded" height={100} />
        </Container>
      </Box>
      <Divider />
      <Container sx={{ py: 4 }}>
        <Quests title="LaunchJoy Quests" useSkeleton={true} questsSize={10} />
        <Quests title="Streaks" useSkeleton={true} questsSize={5} />
        <Quests title="Latest Quests" useSkeleton={true} questsSize={5} />
      </Container>
    </>
  );
}
