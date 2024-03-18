import _ from "lodash";
import { getQuest, getQuests } from "lib/data-layer/quests";
import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { StarPoint as StarPointIcon } from "lib/icons";
import Task from "app/components/tasks/task";

export async function generateStaticParams() {
  const quests = await getQuests();

  return _.map(quests, (quest) => ({
    questId: quest.id.toString(),
  }));
}

export default async function Page({
  params,
}: {
  params: { questId: string };
}): Promise<React.ReactElement> {
  const { title, description, tasks } = await getQuest(params.questId);

  const totalPoints = _.sumBy(tasks, "points");
  const points = _.chain(tasks).filter("completed").sumBy("points").value();

  return (
    <Stack sx={{ maxWidth: 600, mx: "auto" }} spacing={2}>
      <Typography variant="h4" align="center">
        {title}
      </Typography>
      {description && (
        <Typography variant="caption" align="center">
          {description}
        </Typography>
      )}
      <Divider />
      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="body1">Rewards:</Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <StarPointIcon sx={{ color: "transparent" }} />
          <Typography
            variant="body2"
            sx={{ whiteSpace: "nowrap" }}
          >{`${points} / ${totalPoints} POINTs`}</Typography>
        </Stack>
      </Stack>
      <Divider />
      <Typography variant="h6">{_.size(tasks)} steps</Typography>
      {_.map(tasks, (task, index) => (
        <Task key={index} {...task} />
      ))}
      <Button color="success" variant="contained">
        Mint NFTs
      </Button>
    </Stack>
  );
}
