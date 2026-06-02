import { type NextRequest } from "next/server";
import { translations, type Locale } from "@/data/translations";
import { personalInfo, experienceMeta, skillsData, certData, referencesData, keywordsData } from "@/lib/resume-data";

const x = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const tldrKeys = ["tldr_b1", "tldr_b2", "tldr_b3", "tldr_b4"];

const skillCategories = [
  { category: "Languages",      items: ["Node.JS", "Python", "Java", "C#", "JavaScript", "SQL", "Ruby"] },
  { category: "Frameworks",     items: ["NestJS", "SpringBoot", "Angular", "Postman"] },
  { category: "Infrastructure", items: ["AWS", "Terraform", "Ansible", "Chef", "Docker"] },
  { category: "Observability",  items: ["Splunk", "Elastic", "Grafana", "VictoriaMetrics", "Graphite"] },
];

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("locale");
  const locale: Locale = raw === "es" ? "es" : "en";
  const t = translations[locale];

  const tldr = tldrKeys
    .map((k) => {
      const [bold, rest] = t[k].split(" :: ");
      return `
    <item>
      <label>${x(bold)}</label>
      <detail>${x(rest ?? "")}</detail>
    </item>`;
    })
    .join("");

  const work = experienceMeta
    .map(
      (e) => `
    <job>
      <company>${x(e.org)}</company>
      <position>${x(t[e.titleKey])}</position>
      <location>${x(e.loc)}</location>
      <startDate>${e.startDate}</startDate>
      <endDate>${e.endDate}</endDate>
      <period>${x(t[e.periodKey])}</period>
      <highlights>
        ${e.bulletKeys.map((k) => `<highlight>${x(t[k])}</highlight>`).join("\n        ")}
      </highlights>
    </job>`
    )
    .join("");

  const skills = skillCategories
    .map(
      (cat) => `
    <category name="${x(cat.category)}">
      ${cat.items
        .map((name) => {
          const found = skillsData.find((s) => s.name === name);
          return `<skill level="${found?.pct ?? 0}">${x(name)}</skill>`;
        })
        .join("\n      ")}
    </category>`
    )
    .join("");

  const certs = certData
    .map(
      (c) => `
    <certificate>
      <name>${x(c.name)}</name>
      <issuer>${x(c.issuer)}</issuer>
      <url>${x(c.url)}</url>
    </certificate>`
    )
    .join("");

  const refs = referencesData
    .map(
      (r) => `
    <reference>
      <name>${x(r.name)}</name>
      <title>${x(r.title)}</title>
      <relationship>${x(r.meta[locale])}</relationship>
      <text>${x(r.text[locale])}</text>
    </reference>`
    )
    .join("");

  const projects = [
    {
      name: locale === "es" ? "Homelab Personal con Kubernetes" : "Personal Kubernetes Homelab",
      status: locale === "es" ? "En curso" : "Ongoing",
      description: t.extra_p2.replace(/^[^—]+—\s*/, ""),
      keywords: ["Kubernetes", "GitOps", "Flux CD", "Helm", "Grafana", "Loki", "Tailscale", "Longhorn", "MetalLB", "SOPS", "Vault"],
    },
    {
      name: locale === "es"
        ? "Digitalización de Mediciones de Presión"
        : "Digitization of Pressure Measurements for Lab Equipment",
      status: locale === "es" ? "Completado — Abril 2018" : "Completed — April 2018",
      description: t.extra_p1.replace(/^[^—]+—\s*/, ""),
      keywords: ["ASM", "C++", "PIC16F887", "Arduino", "ESP8266", "Google Sheets", "Android"],
    },
  ];

  const projectsXml = projects
    .map(
      (p) => `
    <project>
      <name>${x(p.name)}</name>
      <status>${x(p.status)}</status>
      <description>${x(p.description)}</description>
      <technologies>
        ${p.keywords.map((k) => `<tech>${x(k)}</tech>`).join("\n        ")}
      </technologies>
    </project>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<resume xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" locale="${locale}">

  <basics>
    <name>${x(personalInfo.name)}</name>
    <label>${x(t.tagline)}</label>
    <email>${x(personalInfo.email)}</email>
    <phone>${x(personalInfo.phone)}</phone>
    <url>${x(personalInfo.website)}</url>
    <location>
      <city>${x(personalInfo.location.city)}</city>
      <region>${x(personalInfo.location.region)}</region>
      <countryCode>${x(personalInfo.location.countryCode)}</countryCode>
    </location>
    <profiles>
      <profile network="LinkedIn">${x(personalInfo.linkedin)}</profile>
      <profile network="GitHub">${x(personalInfo.github)}</profile>
    </profiles>
    <citizenship>${x(t.citizenship)}</citizenship>
  </basics>

  <description>
    <p>${x(t.desc_p1)}</p>
    <p>${x(t.desc_p2)}</p>
  </description>

  <tldr>${tldr}
  </tldr>

  <work>${work}
  </work>

  <education>
    <degree>
      <institution>UNEXPO – Luis Caballero Mejias University</institution>
      <area>Systems Engineering</area>
      <studyType>Bachelor of Science</studyType>
      <endDate>2020-08</endDate>
      <location>Caracas, Venezuela</location>
    </degree>
  </education>

  <certificates>${certs}
  </certificates>

  <skills>${skills}
  </skills>

  <languages>
    <language><name>Spanish</name><fluency>Native</fluency></language>
    <language><name>English</name><fluency>Fluent</fluency></language>
  </languages>

  <keywords>
    ${keywordsData.map((k) => `<keyword>${x(k)}</keyword>`).join("\n    ")}
  </keywords>

  <projects>${projectsXml}
  </projects>

  <references>${refs}
  </references>

</resume>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
