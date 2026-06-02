import type { Metadata } from "next";
import TerminalPage from "@/components/TerminalPage";

export const metadata: Metadata = {
  title: "Humberto Raniolo — Reliability Engineer & Software Developer",
  description:
    "Humberto Raniolo — Reliability Engineer & Software Developer with 5+ years of experience in observability tooling, infrastructure automation, and backend web development. Based in Minneapolis, MN.",
};

export default function Home() {
  return (
    <main>
      <TerminalPage />
    </main>
  );
}
