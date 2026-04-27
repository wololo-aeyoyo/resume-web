import type { Metadata } from "next";
import { IBM_Plex_Mono, Inconsolata } from "next/font/google";
import Script from "next/script";
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
  title: "Humberto Raniolo — Reliability Engineer & Software Developer",
  description:
    "Humberto Raniolo — Reliability Engineer & Software Developer with 5+ years of experience in observability tooling, infrastructure automation, and backend web development. Based in Minneapolis, MN.",
  keywords: [
    "Humberto Raniolo",
    "Reliability Engineer",
    "Software Developer",
    "SRE",
    "Site Reliability Engineering",
    "Observability",
    "Splunk",
    "Terraform",
    "Node.js",
    "NestJS",
    "AWS",
    "Kubernetes",
    "Minneapolis",
  ],
  authors: [{ name: "Humberto Raniolo" }],
  creator: "Humberto Raniolo",
  metadataBase: new URL("https://resume.wololoaeyoyo.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://resume.wololoaeyoyo.com",
    title: "Humberto Raniolo — Reliability Engineer & Software Developer",
    description:
      "Reliability Engineer & Software Developer with 5+ years of experience in observability tooling, infrastructure automation, and backend web development.",
    siteName: "Humberto Raniolo",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Humberto Raniolo — Reliability Engineer & Software Developer",
    description:
      "Reliability Engineer & Software Developer with 5+ years of experience in observability tooling, infrastructure automation, and backend web development.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
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
      <Script
        src="https://umami.wololoaeyoyo.com/script.js"
        data-website-id="94bfb49f-b61f-4b19-8934-cc4e50898c1a"
        strategy="afterInteractive"
      />
    </html>
  );
}
