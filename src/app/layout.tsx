import type { Metadata } from "next";
import { IBM_Plex_Mono, Inconsolata } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
});

const inconsolata = Inconsolata({
  weight: ["400", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-inconsolata",
});

export const metadata: Metadata = {
  title: "humberto-raniolo — Reliability Engineer & Software Developer",
  description:
    "Humberto Raniolo  — Reliability Engineer & Software Developer · 5+ years. Systems Engineer with experience in observability tooling, infrastructure automation, and backend web development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ibmPlexMono.variable} ${inconsolata.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
