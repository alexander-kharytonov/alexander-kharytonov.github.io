import type { Metadata } from "next";
import { Container } from "@mui/material";
import { getQuest } from "lib/data-layer/quests";

export async function generateMetadata({
  params,
}: {
  params: { questId: string };
}): Promise<Metadata> {
  const quest = await getQuest(params.questId);

  return {
    title: `LaunchJoy - Quests | ${quest.title}`,
  };
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return <Container sx={{ py: 4 }}>{children}</Container>;
}
