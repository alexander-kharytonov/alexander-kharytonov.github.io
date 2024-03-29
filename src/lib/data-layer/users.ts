import { Address } from "viem";

export type User = {
  id: number | null;
  completedQuestIDs: number[];
  completedTasksIDs: number[];
  points: number;
};

export async function getUser({
  walletAddress,
}: {
  walletAddress: Address;
}): Promise<User> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${walletAddress}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return await response.json();
}

export async function signUser({
  walletAddress,
}: {
  walletAddress: Address;
}): Promise<User> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({ walletAddress }),
  });

  if (!response.ok) {
    throw new Error("Failed to register user");
  }

  return await response.json();
}
