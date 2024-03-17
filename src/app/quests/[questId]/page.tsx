import _ from "lodash";
import { getQuest, getQuests } from "lib/data-layer/quests";
import { Box, Typography } from "@mui/material";

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

  return (
    <>
      <Box>
        <Typography variant="h6">{title}</Typography>
        {description && (
          <Typography variant="caption">{description}</Typography>
        )}
        {_.map(tasks, (task, index) => (
          <Typography key={index} variant="body1">
            {task.title}
          </Typography>
        ))}
      </Box>
    </>
  );
}
