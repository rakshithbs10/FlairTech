import { BarChart3, Compass, Boxes, Server, ShieldCheck, Database } from "lucide-react";

export const SERVICES = [
  {
    title: "Business Intelligence",
    icon: BarChart3,
    description:
      "Turn raw data into decisions with modern BI platforms, semantic models, and self-service analytics built for scale.",
    tags: ["Power BI", "Tableau", "SSAS", "DAX"],
  },
  {
    title: "Design / Architecture",
    icon: Compass,
    description:
      "Pragmatic solution architecture and UX design that balances long-term flexibility with shipping speed.",
    tags: ["Solution Architecture", "Microservices", "Domain Design"],
  },
  {
    title: "Enterprise Resource Planning",
    icon: Boxes,
    description:
      "End-to-end ERP implementation, customization, and support across SAP, Oracle, and Microsoft Dynamics.",
    tags: ["SAP", "Oracle", "Dynamics 365"],
  },
  {
    title: "Infrastructure Engineering / Administration",
    icon: Server,
    description:
      "Cloud-native infrastructure on Azure and AWS, hardened with automation, observability, and least-privilege access.",
    tags: ["Azure", "AWS", "Kubernetes", "Terraform"],
  },
  {
    title: "Quality Assurance / Test Engineer",
    icon: ShieldCheck,
    description:
      "Automated, performance, and security testing programs that keep releases safe and predictable.",
    tags: ["Selenium", "Playwright", "JMeter", "CI/CD"],
  },
  {
    title: "Database Management / Development",
    icon: Database,
    description:
      "Design, tune, and operate critical database platforms — from OLTP to data warehousing and replication.",
    tags: ["SQL Server", "Oracle", "PostgreSQL", "MongoDB"],
  },
] as const;
