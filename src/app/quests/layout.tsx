import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LaunchJoy - Quests",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return <>{children}</>;
}
