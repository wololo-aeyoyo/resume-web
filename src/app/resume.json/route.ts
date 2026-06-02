import { type NextRequest } from "next/server";
import { translations, type Locale } from "@/data/translations";
import { personalInfo, experienceMeta, skillsData, certData, referencesData } from "@/lib/resume-data";

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("locale");
  const locale: Locale = raw === "es" ? "es" : "en";
  const t = translations[locale];

  const resume = {
    $schema: "https://raw.githubusercontent.com/jsonresume/resume-schema/master/schema.json",
    basics: {
      name: personalInfo.name,
      label: t.tagline,
      email: personalInfo.email,
      phone: personalInfo.phone,
      url: personalInfo.website,
      summary: t.desc_p1,
      location: {
        city: personalInfo.location.city,
        region: personalInfo.location.region,
        countryCode: personalInfo.location.countryCode,
      },
      profiles: [
        { network: "LinkedIn", username: "humberto-raniolo-sa4", url: personalInfo.linkedin },
        { network: "GitHub", username: "wololo-aeyoyo", url: personalInfo.github },
      ],
    },
    work: experienceMeta.map((e) => ({
      name: e.org,
      position: t[e.titleKey],
      location: e.loc,
      startDate: e.startDate,
      endDate: e.endDate,
      highlights: e.bulletKeys.map((k) => t[k]),
    })),
    education: [
      {
        institution: "UNEXPO – Luis Caballero Mejias University",
        url: "https://unexpo.edu.ve",
        area: "Systems Engineering",
        studyType: "Bachelor of Science",
        endDate: "2020-08",
      },
    ],
    certificates: certData.map((c) => ({
      name: c.name,
      issuer: c.issuer,
      url: c.url,
    })),
    skills: [
      { name: "Languages",      keywords: ["Node.JS", "Python", "Java", "C#", "JavaScript", "SQL", "Ruby"] },
      { name: "Frameworks",     keywords: ["NestJS", "SpringBoot", "Angular"] },
      { name: "Infrastructure", keywords: ["AWS", "Terraform", "Ansible", "Chef", "Docker"] },
      { name: "Observability",  keywords: ["Splunk", "Elastic", "Grafana", "VictoriaMetrics", "Graphite"] },
    ],
    languages: [
      { language: "Spanish", fluency: "Native" },
      { language: "English", fluency: "Fluent" },
    ],
    references: referencesData.map((r) => ({
      name: r.name,
      reference: r.text[locale],
    })),
    projects: [
      {
        name: "Personal Kubernetes Homelab",
        description: t.extra_p2.replace(/^[^—]+—\s*/, ""),
        keywords: ["Kubernetes", "GitOps", "Flux CD", "Helm", "Grafana", "Tailscale"],
      },
      {
        name: "Digitization of Pressure Measurements",
        startDate: "2018-04",
        endDate: "2018-04",
        description: t.extra_p1.replace(/^[^—]+—\s*/, ""),
        keywords: ["Arduino", "C++", "ESP8266", "Google Sheets", "Android"],
      },
    ],
  };

  return Response.json(resume, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
