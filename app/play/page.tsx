import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import GameClient from "@/components/GameClient";

export const dynamic = "force-dynamic";

export default async function PlayPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return <GameClient playerName={user.name} />;
}
