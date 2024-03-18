import _ from "lodash";
import { Address } from "viem";

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

export type MintNFTResponse = {
  signature: string;
  message: string;
  contractAddress: Address;
};

export async function getQuests(): Promise<Quests> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/quests`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
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
      cache: "no-store",
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
      cache: "no-store",
      body: JSON.stringify({ userId, taskId }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to check task");
  }

  const { taskCompleted } = await response.json();

  return taskCompleted;
}

export async function mintNFTs({
  userId,
  questId,
}: {
  userId: number;
  questId: number;
}): Promise<MintNFTResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/quests/mint-nft`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({ userId, questId }),
    }
  );

  if (!response.ok) {
    const { message } = await response.json();

    if (_.isString(message)) {
      throw new Error(message);
    } else {
      throw new Error("Failed to mint NFT");
    }
  }

  return await response.json();
}
