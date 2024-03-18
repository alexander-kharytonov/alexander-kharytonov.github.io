import _ from "lodash";

export type Task = {
  id: number;
  title: string;
  description: string;
  points: number;
};

export type Quest = {
  id: number;
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
      next: { tags: ["quests"] },
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
      next: { tags: ["quest"] },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch quest");
  }

  const quest = await response.json();

  return quest;
}

export async function checkTask({
  userId,
  taskId,
}: {
  userId: number;
  taskId: number;
}): Promise<boolean> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/quests/check-task`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, taskId }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to check task");
  }

  const { taskCompleted } = await response.json();

  return taskCompleted;
}
