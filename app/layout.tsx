import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bridgestone ESG Quiz",
  description: "Interactive ESG multiple-choice quiz with timed leaderboard ranking",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-leaf-950 antialiased">{children}</body>
    </html>
  );
}
