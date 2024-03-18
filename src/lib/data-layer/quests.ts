import _ from "lodash";
import { UUID } from "crypto";

export type Task = {
  id: UUID;
  title: string;
  description: string;
  points: number;
};

export type Quest = {
  id: UUID;
  title: string;
  description: string;
  logoUrl: string | null;
  tasks: Task[];
};

export type Quests = Quest[];

export async function getQuests(): Promise<Quests> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/quests`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch quests");
  }

  const { quests } = await response.json();

  return quests;
}

export async function getQuest(questId: string): Promise<Quest> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/quests/${questId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch quest");
  }

  const quest = await response.json();

  return quest;
}
