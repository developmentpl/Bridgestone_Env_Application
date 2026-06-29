"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, employeeId, phone }),
    });
    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Login failed. Try again.");
      setBusy(false);
    }
  }

  return (
    <main className="bg-home flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="w-full rounded-3xl bg-white/85 p-8 shadow-card backdrop-blur animate-pop">
          <div className="text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/backgrounds/Bridgestone_logo_Original.png"
              alt="Bridgestone"
              className="mx-auto h-10 w-auto object-contain"
            />
            <h1 className="mt-3 text-2xl font-extrabold text-leaf-800">
              Bridgestone ESG Quiz
            </h1>
            <p className="text-sm font-medium text-leaf-600">
              Interactive MCQ challenge
            </p>
          </div>

          <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
            <label className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-leaf-800">Your name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={60}
                placeholder="e.g. Priya Sharma"
                className="rounded-xl border border-leaf-200 bg-white px-4 py-3 outline-none ring-leaf-400 focus:ring-2"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-leaf-800">Employee ID</span>
              <input
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                required
                maxLength={60}
                placeholder="e.g. BS12345"
                className="rounded-xl border border-leaf-200 bg-white px-4 py-3 outline-none ring-leaf-400 focus:ring-2"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-leaf-800">Mobile number</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                type="tel"
                inputMode="numeric"
                maxLength={16}
                placeholder="e.g. 9876543210"
                className="rounded-xl border border-leaf-200 bg-white px-4 py-3 outline-none ring-leaf-400 focus:ring-2"
              />
            </label>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              disabled={busy}
              className="mt-2 rounded-2xl bg-leaf-600 px-6 py-3 text-lg font-bold text-white shadow-card transition hover:bg-leaf-700 active:scale-95 disabled:opacity-60"
            >
              {busy ? "Logging in..." : "Let's play"}
            </button>
          </form>

          <p className="mt-4 text-center text-xs font-medium text-leaf-700/70">
            Developed by <span className="font-bold text-leaf-800">Parallel Learning</span>
          </p>
        </div>
      </div>
    </main>
  );
}
