import { type Locale } from "@/data/translations";

export const personalInfo = {
  name: "Humberto A. Raniolo",
  email: "humberto.raniolo@gmail.com",
  phone: "(+1) 763-238-6552",
  location: { city: "Minneapolis", region: "MN", countryCode: "US" },
  linkedin: "https://linkedin.com/in/humberto-raniolo-sa4/",
  github: "https://github.com/wololo-aeyoyo",
  website: "https://resume.wololoaeyoyo.com",
};

export const experienceMeta = [
  {
    org: "BestBuy",
    loc: "Richfield, MN",
    startDate: "2023-09",
    endDate: "2025-03",
    titleKey: "j1_title",
    periodKey: "j1_period",
    bulletKeys: ["j1_b1", "j1_b2", "j1_b3", "j1_b4"],
  },
  {
    org: "Accentio Studios",
    loc: "Remote",
    startDate: "2023-02",
    endDate: "2023-05",
    titleKey: "j2_title",
    periodKey: "j2_period",
    bulletKeys: ["j2_b1", "j2_b2"],
  },
  {
    org: "Credicard Consortium",
    loc: "Remote",
    startDate: "2021-01",
    endDate: "2023-12",
    titleKey: "j3_title",
    periodKey: "j3_period",
    bulletKeys: ["j3_b1", "j3_b2", "j3_b3", "j3_b4", "j3_b5"],
  },
  {
    org: "Telefónica",
    loc: "Caracas, Venezuela",
    startDate: "2019-01",
    endDate: "2020-12",
    titleKey: "j4_title",
    periodKey: "j4_period",
    bulletKeys: ["j4_b1", "j4_b2"],
  },
];

export const skillsData = [
  { name: "Node.JS",    pct: 88 },
  { name: "NestJS",     pct: 85 },
  { name: "Splunk",     pct: 90 },
  { name: "Terraform",  pct: 82 },
  { name: "AWS",        pct: 80 },
  { name: "Ansible",    pct: 75 },
  { name: "JavaScript", pct: 75 },
  { name: "Python",     pct: 72 },
  { name: "Chef",       pct: 72 },
  { name: "Java",       pct: 70 },
  { name: "Docker",     pct: 70 },
  { name: "SQL",        pct: 78 },
  { name: "SpringBoot", pct: 68 },
  { name: "C#",         pct: 65 },
  { name: "Angular",    pct: 60 },
];

export const certData = [
  {
    name: "Splunk Cloud Administration",
    issuer: "Splunk",
    url: "https://www.credly.com/badges/43b10234-742d-44fc-8052-a21e5bfabc13",
  },
  {
    name: "Splunk Cluster Administration",
    issuer: "Splunk",
    url: "https://www.credly.com/badges/782d7907-5cf9-49ac-93d0-72e30cc4947e",
  },
  {
    name: "Using the Splunk REST API",
    issuer: "Splunk",
    url: "https://www.credly.com/badges/39ba9c1d-1279-4a77-a183-28c1bcb6ec7a",
  },
];

export const referencesData: Array<{
  name: string;
  title: string;
  meta: Record<Locale, string>;
  text: Record<Locale, string>;
}> = [
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

export const keywordsData = [
  "Node.JS", "Python", "Java", "C#", "Ruby", "NestJS", "SpringBoot", "Angular",
  "AWS", "Terraform", "Splunk", "Elastic", "Grafana", "Docker", "REST API",
  "Microservices", "Observability", "SRE", "CI/CD", "RabbitMQ", "OpenLDAP",
  "Cloud Migration", "VictoriaMetrics", "Graphite", "Ansible", "Chef",
];
