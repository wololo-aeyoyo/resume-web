import { type NextRequest } from "next/server";
import { translations, type Locale } from "@/data/translations";
import { personalInfo, experienceMeta, certData } from "@/lib/resume-data";

const expTags: Record<string, string[]> = {
  "BestBuy": ["Splunk", "Elastic", "Grafana", "VictoriaMetrics", "Graphite", "Terraform", "AWS", "Chef", "Ansible", "SRE", "observability", "cloud-migration"],
  "Accentio Studios": ["NestJS", "Node.JS", "RabbitMQ", "Docker", "microservices", "backend"],
  "Credicard Consortium": ["Node.JS", "NestJS", "SpringBoot", "SQL", "OpenLDAP", "Flutter", "Angular", "CI/CD", "fintech", "REST-API"],
  "Telefónica": ["C#", "Java", "Struts", "SQL-Server", "billing", "CDR"],
};

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("locale");
  const locale: Locale = raw === "es" ? "es" : "en";
  const t = translations[locale];
  const origin = personalInfo.website;

  const workItems = experienceMeta.map((e) => ({
    id: `job-${e.org.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${e.startDate}`,
    url: `${origin}/#history`,
    title: `${t[e.titleKey]} · ${e.org}`,
    summary: `${t[e.periodKey]} — ${e.loc}`,
    content_text: e.bulletKeys.map((k) => t[k]).join("\n"),
    date_published: new Date(`${e.startDate}-01`).toISOString(),
    date_modified: new Date(`${e.endDate}-01`).toISOString(),
    tags: ["work", "experience", ...(expTags[e.org] ?? [])],
  }));

  const projectItems = [
    {
      id: "project-kubernetes-homelab",
      url: `${origin}/#projects`,
      title: locale === "es" ? "Homelab Personal con Kubernetes" : "Personal Kubernetes Homelab",
      summary: locale === "es" ? "En curso" : "Ongoing",
      content_text: t.extra_p2.replace(/^[^—]+—\s*/, ""),
      date_published: new Date("2023-01-01").toISOString(),
      tags: ["project", "Kubernetes", "GitOps", "Flux-CD", "Helm", "Grafana", "Loki", "Tailscale", "Longhorn", "self-hosted"],
    },
    {
      id: "project-pressure-measurements",
      url: `${origin}/#projects`,
      title: locale === "es"
        ? "Digitalización de Mediciones de Presión"
        : "Digitization of Pressure Measurements for Lab Equipment",
      summary: "April 2018",
      content_text: t.extra_p1.replace(/^[^—]+—\s*/, ""),
      date_published: new Date("2018-04-01").toISOString(),
      tags: ["project", "Arduino", "C++", "ESP8266", "Google-Sheets", "Android", "IoT", "embedded"],
    },
  ];

  const educationItems = [
    {
      id: "education-bs-systems-engineering",
      url: `${origin}/#education`,
      title: locale === "es"
        ? "Ing. en Sistemas (Licenciatura) — UNEXPO"
        : "BS in Systems Engineering — UNEXPO",
      summary: locale === "es" ? "Agosto 2020 · Caracas, Venezuela" : "August 2020 · Caracas, Venezuela",
      content_text: "UNEXPO – Luis Caballero Mejias University",
      date_published: new Date("2020-08-01").toISOString(),
      tags: ["education", "systems-engineering", "university"],
    },
    ...certData.map((c) => ({
      id: `cert-${c.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
      url: c.url,
      title: c.name,
      summary: c.issuer,
      content_text: `${c.name} — issued by ${c.issuer}`,
      date_published: new Date("2023-01-01").toISOString(),
      tags: ["certification", "Splunk", c.issuer.toLowerCase()],
    })),
  ];

  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: `${personalInfo.name} — ${t.tagline}`,
    home_page_url: origin,
    feed_url: `${origin}/feed.json?locale=${locale}`,
    description: `${t.desc_p1} ${t.desc_p2}`,
    language: locale,
    authors: [{ name: personalInfo.name, url: personalInfo.linkedin }],
    items: [...workItems, ...projectItems, ...educationItems],
  };

  return Response.json(feed, {
    headers: { "Content-Type": "application/feed+json; charset=utf-8" },
  });
}
