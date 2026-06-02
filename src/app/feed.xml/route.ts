import { type NextRequest } from "next/server";
import { translations, type Locale } from "@/data/translations";
import { personalInfo, experienceMeta } from "@/lib/resume-data";

const x = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("locale");
  const locale: Locale = raw === "es" ? "es" : "en";
  const t = translations[locale];
  const origin = personalInfo.website;

  const items = experienceMeta
    .map(
      (e) => `    <item>
      <title>${x(`${t[e.titleKey]} · ${e.org}`)}</title>
      <description>${x(e.bulletKeys.map((k) => t[k]).join(" "))}</description>
      <pubDate>${new Date(`${e.startDate}-01`).toUTCString()}</pubDate>
      <guid isPermaLink="false">job-${e.org.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${e.startDate}</guid>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${x(`${personalInfo.name} — ${t.tagline}`)}</title>
    <link>${x(origin)}</link>
    <description>${x(t.desc_p1)}</description>
    <language>${locale}</language>
    <atom:link href="${x(`${origin}/feed.xml?locale=${locale}`)}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
