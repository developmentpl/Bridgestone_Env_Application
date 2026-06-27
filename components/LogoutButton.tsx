"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton({ name }: { name: string }) {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await fetch("/api/logout", { method: "POST" });
        router.push("/login");
        router.refresh();
      }}
      className="text-sm text-leaf-700/70 underline-offset-2 hover:underline"
    >
      Not {name}? Log out
    </button>
  );
}
