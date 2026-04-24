"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { translations, type Locale } from "@/data/translations";

// ── Flag SVGs ──────────────────────────────────────────────
function FlagEN() {
  return (
    <svg width="18" height="12" viewBox="0 0 60 30" aria-hidden="true">
      <clipPath id="en-clip">
        <path d="M0 0v30h60V0z" />
      </clipPath>
      <path d="M0 0v30h60V0z" fill="#012169" />
      <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0l60 30m0-30L0 30" stroke="#C8102E" strokeWidth="4" clipPath="url(#en-clip)" />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

function FlagES() {
  return (
    <svg width="18" height="12" viewBox="0 0 3 2" aria-hidden="true">
      <rect width="3" height="2" fill="#d52b1e" />
      <rect width="3" height="1" y="0.5" fill="#f1bf00" />
    </svg>
  );
}

// ── Meta-item icons ────────────────────────────────────────
function IconLocation() {
  return (
    <svg className="ci-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg className="ci-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
    </svg>
  );
}

function IconEmail() {
  return (
    <svg className="ci-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 2-8 5-8-5h16zm0 12H4V9l8 5 8-5v9z" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg className="ci-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconGitHub() {
  return (
    <svg className="ci-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

// ── Highlight specific keywords in a string ───────────────
function highlightKeywords(
  text: string,
  highlights: { word: string; color: string }[]
): React.ReactNode[] {
  const pattern = new RegExp(
    `(${highlights.map((h) => h.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "g"
  );
  const parts = text.split(pattern);
  return parts.map((part, i) => {
    const h = highlights.find((h) => h.word === part);
    return h ? (
      <span key={i} style={{ color: h.color }}>{part}</span>
    ) : (
      part
    );
  });
}

// ── Skill bar with IntersectionObserver ───────────────────
function SkillBar({ name, pct }: { name: string; pct: number }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const item = itemRef.current;
    const fill = fillRef.current;
    if (!item || !fill) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            requestAnimationFrame(() => {
              fill.style.transform = `scaleX(${pct / 100})`;
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
    );
    obs.observe(item);
    return () => obs.disconnect();
  }, [pct]);

  return (
    <div className="skill-item" ref={itemRef}>
      <span className="skill-name">{name}</span>
      <div className="skill-bar">
        <div className="skill-fill" ref={fillRef} />
      </div>
    </div>
  );
}

// ── Main page component ───────────────────────────────────
export default function TerminalPage() {
  const [locale, setLocale] = useState<Locale>("en");
  const [fading, setFading] = useState(false);
  const t = useCallback((key: string) => translations[locale][key] ?? key, [locale]);

  function switchLocale(next: Locale) {
    if (next === locale) return;
    setFading(true);
    setTimeout(() => {
      setLocale(next);
      setFading(false);
    }, 180);
  }

  const fadeClass = fading ? "lang-fade" : "";

  const skills = [
    { name: "Node.JS",     pct: 88 },
    { name: "NestJS",      pct: 85 },
    { name: "Splunk",      pct: 90 },
    { name: "Terraform",   pct: 82 },
    { name: "AWS",         pct: 80 },
    { name: "Ansible",     pct: 75 },
    { name: "JavaScript",  pct: 75 },
    { name: "Python",      pct: 72 },
    { name: "Chef",        pct: 72 },
    { name: "Java",        pct: 70 },
    { name: "Docker",      pct: 70 },
    { name: "SQL",         pct: 78 },
    { name: "SpringBoot",  pct: 68 },
    { name: "C#",          pct: 65 },
    { name: "Angular",     pct: 60 },
  ];

  const keywords = [
    "Node.JS", "Python", "Java", "C#", "Ruby", "NestJS", "SpringBoot", "Angular",
    "AWS", "Terraform", "Splunk", "Elastic", "Grafana", "Docker", "REST API",
    "Microservices", "Observability", "SRE", "CI/CD", "RabbitMQ", "OpenLDAP",
    "Cloud Migration", "VictoriaMetrics", "Graphite", "Ansible", "Chef",
  ];

  const experienceEntries = [
    {
      title: t("j1_title"),
      org: "· BestBuy",
      period: t("j1_period"),
      loc: "Richfield, MN",
      bullets: ["j1_b1", "j1_b2", "j1_b3", "j1_b4"],
    },
    {
      title: t("j2_title"),
      org: "· Accentio Studios",
      period: t("j2_period"),
      loc: "Remote",
      bullets: ["j2_b1", "j2_b2"],
    },
    {
      title: t("j3_title"),
      org: "· Credicard Consortium",
      period: t("j3_period"),
      loc: "Remote",
      bullets: ["j3_b1", "j3_b2", "j3_b3", "j3_b4"],
    },
    {
      title: t("j4_title"),
      org: "· Telefónica",
      period: t("j4_period"),
      loc: "Caracas, Venezuela",
      bullets: ["j4_b1", "j4_b2"],
    },
  ];

  const optionsItems = [
    { flag: "-L,", name: "--languages",      key: "opt_lang_be" },
    { flag: "-F,", name: "--frameworks",     key: "opt_wp" },
    { flag: "-I,", name: "--infrastructure", key: "opt_db" },
    { flag: "-O,", name: "--observability",  key: "opt_infra" },
    { flag: "-C,", name: "--certifications", key: "opt_fe" },
  ];

  const eduItems = [
    {
      term: t("edu1_term"),
      desc: <>UNEXPO – Luis Caballero Mejias University · {t("edu1_detail")}</>,
    },
    {
      term: t("edu2_term"),
      desc: <a href="https://www.credly.com/badges/43b10234-742d-44fc-8052-a21e5bfabc13" target="_blank" rel="noopener noreferrer">Splunk · Credly</a>,
    },
    {
      term: t("edu3_term"),
      desc: <a href="https://www.credly.com/badges/782d7907-5cf9-49ac-93d0-72e30cc4947e" target="_blank" rel="noopener noreferrer">Splunk · Credly</a>,
    },
    {
      term: t("edu4_term"),
      desc: <a href="https://www.credly.com/badges/39ba9c1d-1279-4a77-a183-28c1bcb6ec7a" target="_blank" rel="noopener noreferrer">Splunk · Credly</a>,
    },
  ];

  const recommendations = [
    {
      name: "Miguel Valdes",
      title: "Forward Deployed Engineer",
      meta: {
        en: "February 2025 · BestBuy · same team",
        es: "Febrero 2025 · BestBuy · mismo equipo",
      },
      text: {
        en: "Humberto was a critical member of the reliability team in BBY for a year, during which he consistently demonstrated professionalism, strong technical abilities, and a great team-oriented attitude. He learned our environment and tooling pretty fast.\n\nHe played a key role in automating repetitive tasks, showcasing problem-solving, leadership and adaptability. His contributions made a real impact, and he was always willing to collaborate and support the team.\n\nAny company would be lucky to have him, and I'm confident he'll thrive in his next role.",
        es: "Humberto fue un miembro clave del equipo de Reliability en BBY durante un año, durante el cual demostró consistentemente profesionalismo, sólidas habilidades técnicas y una excelente actitud orientada al trabajo en equipo. Aprendió nuestro entorno y herramientas muy rápidamente.\n\nJugó un papel fundamental en la automatización de tareas repetitivas, mostrando capacidad de resolución de problemas, liderazgo y adaptabilidad. Sus contribuciones tuvieron un impacto real, y siempre estuvo dispuesto a colaborar y apoyar al equipo.\n\nCualquier empresa sería afortunada de tenerlo, y estoy seguro de que prosperará en su próximo rol.",
      },
    },
    {
      name: "Diego Uzcátegui",
      title: "Full Stack Developer · Java & JavaScript",
      meta: {
        en: "June 2023 · Credicard · same team",
        es: "Junio 2023 · Credicard · mismo equipo",
      },
      text: {
        en: "Humberto is a colleague and fellow student in Systems Engineering at Unexpo. We worked together at Credicard, where he demonstrated outstanding skills in web services using Java and Node.js. He is a complete and competent professional, and I have full confidence that he would be a valuable asset to any software development team. I recommend him without hesitation.",
        es: "Humberto es un colega y compañero de estudios en Ingeniería de Sistemas en la Unexpo. Trabajamos juntos en Credicard, donde demostró habilidades sobresalientes en servicios web usando Java y Node.js. Es un profesional completo y competente, y tengo plena confianza en que sería un activo valioso para cualquier equipo de desarrollo de software. Lo recomiendo sin dudarlo.",
      },
    },
    {
      name: "José Martínez",
      title: "Full-Stack Developer · Java & JavaScript",
      meta: {
        en: "June 2023 · Credicard · same team",
        es: "Junio 2023 · Credicard · mismo equipo",
      },
      text: {
        en: "I would highly recommend Humberto as a colleague and teammate without hesitation. I have full confidence in his technical abilities, and I believe he would be a valuable asset to any software development team. His expertise in web services, supported by a strong foundation in Systems Engineering, makes him a well-rounded and competent professional.",
        es: "Recomendaría ampliamente a Humberto como colega y compañero de equipo sin dudarlo. Tengo plena confianza en sus capacidades técnicas, y creo que sería un activo valioso para cualquier equipo de desarrollo de software. Su experiencia en servicios web, respaldada por una sólida formación en Ingeniería de Sistemas, lo convierte en un profesional completo y competente.",
      },
    },
    {
      name: "Alvaro Gomez",
      title: "Mobile Dev Specialist · Founder @AccentioStudios",
      meta: {
        en: "June 2023 · Accentio Studios · same team",
        es: "Junio 2023 · Accentio Studios · mismo equipo",
      },
      text: {
        en: "I highly recommend Humberto as a backend developer. He consistently demonstrated responsibility and delivered high-quality work. His technical skills are impressive, making him a valuable asset to any development team.",
        es: "Recomiendo ampliamente a Humberto como desarrollador backend. Demostró consistentemente responsabilidad y entregó trabajo de alta calidad. Sus habilidades técnicas son impresionantes, lo que lo convierte en un activo valioso para cualquier equipo de desarrollo.",
      },
    },
    {
      name: "Samuel Pernía",
      title: "Systems Engineer · SysAdmin",
      meta: {
        en: "2020 · UNEXPO · same graduating class",
        es: "2020 · UNEXPO · misma promoción",
      },
      text: {
        en: "Humberto and I graduated in the same field of study, Systems Engineering, and took several courses together. Throughout our academic journey, I had the opportunity to witness his exceptional professionalism and valuable contributions. His dedication and commitment were evident in every subject we tackled together. He had a remarkable ability to grasp complex technical concepts and apply them effectively in practical projects. His leadership, communication skills, and coordination were instrumental in achieving outstanding results.",
        es: "Humberto y yo nos graduamos en la misma área de estudio, Ingeniería de Sistemas, y cursamos varias materias juntos. A lo largo de nuestra trayectoria académica, tuve la oportunidad de ser testigo de su excepcional profesionalismo y valiosas contribuciones. Su dedicación y compromiso fueron evidentes en cada materia que abordamos juntos. Tenía una notable capacidad para comprender conceptos técnicos complejos y aplicarlos efectivamente en proyectos prácticos. Su liderazgo, habilidades de comunicación y coordinación fueron fundamentales para lograr resultados sobresalientes.",
      },
    },
  ];

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="terminal">
      {/* Language bar */}
      <div className="lang-bar">
        <span className="lang-prompt">$ set-locale</span>
        <button
          className={`lang-btn${locale === "en" ? " active" : ""}`}
          onClick={() => switchLocale("en")}
          aria-label="Switch to English"
        >
          <FlagEN /> EN
        </button>
        <button
          className={`lang-btn${locale === "es" ? " active" : ""}`}
          onClick={() => switchLocale("es")}
          aria-label="Cambiar a Español"
        >
          <FlagES /> ES
        </button>
      </div>

      {/* Manpage header */}
      <div className="manpage-header">
        <span>RANIOLO(1)</span>
        <span className={`hdr-center t ${fadeClass}`}>{t("hdr")}</span>
        <span className="hdr-right">RANIOLO(1)</span>
      </div>

      {/* NAME */}
      <div className="section">
        <div className={`section-title t ${fadeClass}`}>{t("sec_name")}</div>
        <div className="name-block">
          <div className="cmd-name">
            Humberto A. Raniolo Infante
            <span className="cmd-section">(1)</span>
            <span className="cursor" aria-hidden="true" />
          </div>
          <div className={`synopsis-line t ${fadeClass}`}>
            <span style={{ color: "var(--cyan)" }}>humberto-raniolo</span>
            {" — "}
            {t("tagline")}
          </div>
          <div className="meta-line">
            <span className={`meta-item t ${fadeClass}`}>
              <IconLocation />
              <span>{t("location")}</span>
            </span>
            <span className="meta-item">
              <IconPhone />
              <span>(+1) 763-238-6552</span>
            </span>
            <span className="meta-item">
              <IconEmail />
              <a href="mailto:humberto.raniolo@gmail.com">humberto.raniolo@gmail.com</a>
            </span>
            <span className="meta-item">
              <IconLinkedIn />
              <a href="https://linkedin.com/in/humberto-raniolo-sa4/" target="_blank" rel="noopener noreferrer">
                linkedin.com/in/humberto-raniolo-sa4
              </a>
            </span>
            <span className="meta-item">
              <IconGitHub />
              <a href="https://github.com/wololo-aeyoyo" target="_blank" rel="noopener noreferrer">
                github.com/wololo-aeyoyo
              </a>
            </span>
          </div>
          <div className={`citizenship t ${fadeClass}`}>
            {t("citizenship")}
          </div>
        </div>
      </div>

      {/* SYNOPSIS */}
      <div className="section">
        <div className={`section-title t ${fadeClass}`}>{t("sec_synopsis")}</div>
        <div className="body-text">
          <p className={`synopsis-line t ${fadeClass}`}>
            <span className="kw">humberto-raniolo</span>
            {" [--sre AWS|Splunk|Terraform]"}
            {" [--dev NodeJS|NestJS|Python]"}
            {" [--language es|en]"}
            {" [--location Minneapolis,MN]"}
            {" [--open-to-relocation]"}
          </p>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="section">
        <div className={`section-title t ${fadeClass}`}>{t("sec_desc")}</div>
        <div className="body-text">
          <p className={`t ${fadeClass}`}>
            <span style={{ color: "var(--amber)" }}>humberto-raniolo</span>
            {" "}
            {t("desc_p1").replace(/^humberto-raniolo\s?/, "")}
          </p>
          <p className={`t ${fadeClass}`}>
            {highlightKeywords(t("desc_p2"), [
              { word: "--sre",  color: "var(--cyan)" },
              { word: "--dev",  color: "var(--cyan)" },
            ])}
          </p>
        </div>
      </div>

      {/* OPTIONS / TECHNICAL SKILLS */}
      <div className="section">
        <div className={`section-title t ${fadeClass}`}>{t("sec_options")}</div>
        <div className="def-list">
          {optionsItems.map((item) => (
            <div className="def-item" key={item.key}>
              <span className="def-term">
                <span className="fl">{item.flag}</span>
                {item.name}
              </span>
              <span className={`def-desc t ${fadeClass}`}>{t(item.key)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* HISTORY / EXPERIENCE */}
      <div className="section">
        <div className={`section-title t ${fadeClass}`}>{t("sec_history")}</div>
        {experienceEntries.map((entry, idx) => (
          <div className="exp-entry" key={idx}>
            <div className="exp-header">
              <span className={`exp-title t ${fadeClass}`}>{entry.title}</span>
              {" "}
              <span className="exp-org">{entry.org}</span>
              <span className={`exp-period t ${fadeClass}`}>{entry.period}</span>
              <span className={`exp-loc t ${fadeClass}`}>{entry.loc}</span>
            </div>
            <ul className="exp-desc">
              {entry.bullets.map((key) => (
                <li key={key} className={`t ${fadeClass}`}>{t(key)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* FILES / SKILLS */}
      <div className="section">
        <div className={`section-title t ${fadeClass}`}>{t("sec_skills")}</div>
        <div className="skills-grid">
          {skills.map((s) => (
            <SkillBar key={s.name} name={s.name} pct={s.pct} />
          ))}
        </div>
      </div>

      {/* KEYWORDS */}
      <div className="section">
        <div className={`section-title t ${fadeClass}`}>{t("sec_kw")}</div>
        <div className="tags">
          {keywords.map((kw) => (
            <span className="tag" key={kw}>{kw}</span>
          ))}
        </div>
      </div>

      {/* DEPENDENCIES / EDUCATION */}
      <div className="section">
        <div className={`section-title t ${fadeClass}`}>{t("sec_edu")}</div>
        <div className="def-list">
          {eduItems.map((item, idx) => (
            <div className="def-item" key={idx}>
              <span className={`def-term edu-term t ${fadeClass}`}>{item.term}</span>
              <span className="def-desc">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* PROJECTS */}
      <div className="section">
        <div className={`section-title t ${fadeClass}`}>{t("sec_extra")}</div>
        <div className="body-text">
          {[
            { key: "extra_p1", titleColor: "var(--amber)" },
            { key: "extra_p2", titleColor: "var(--amber)" },
          ].map(({ key, titleColor }) => {
            const text = t(key);
            const sep = text.indexOf(" — ");
            return (
              <p key={key} className={`t ${fadeClass}`}>
                {sep !== -1 ? (
                  <>
                    <span style={{ color: titleColor }}>{text.slice(0, sep + 3)}</span>
                    {text.slice(sep + 3)}
                  </>
                ) : text}
              </p>
            );
          })}
        </div>
      </div>

      {/* REFERENCES */}
      <div className="section">
        <div className={`section-title t ${fadeClass}`}>{t("sec_refs")}</div>
        <div className="refs-list">
          {recommendations.map((ref) => (
            <div className="ref-entry" key={ref.name}>
              <div className="ref-header">
                <span className="ref-name">{ref.name}</span>
                <span className="ref-title">{ref.title}</span>
                <span className={`ref-meta t ${fadeClass}`}>{ref.meta[locale]} · {t("refs_via")}</span>
              </div>
              <div className={`ref-text t ${fadeClass}`}>
                {ref.text[locale].split("\n\n").map((para, i) => (
                  <p key={i} style={i > 0 ? { marginTop: "0.4rem" } : undefined}>{para}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="manpage-footer">
        <span className={`t ${fadeClass}`}>{t("footer_l")}</span>
        <span className={`t ${fadeClass}`}>{t("footer_upd")} {dateStr}</span>
        <span>RANIOLO(1)</span>
      </div>
    </div>
  );
}
