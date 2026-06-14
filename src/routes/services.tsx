import { createFileRoute } from "@tanstack/react-router";
import { SERVICES } from "@/lib/services";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — FlairTech Solutions" },
      { name: "description", content: "BI, Architecture, ERP, Infrastructure, QA, and Database services from FlairTech Solutions." },
      { property: "og:title", content: "Services — FlairTech Solutions" },
      { property: "og:description", content: "Six service lines built for enterprise outcomes." },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <div>
      <section className="bg-[image:var(--gradient-hero)] py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground/70">Services</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold sm:text-5xl">Six practices, one delivery promise.</h1>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/85">From data and analytics to cloud, ERP, and quality engineering — built and supported by senior consultants who own outcomes.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <article key={s.title} className="group rounded-xl border border-border bg-card p-7 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-brand/40">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-[image:var(--gradient-brand)] text-primary-foreground">
                <s.icon className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-xl font-semibold">{s.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{s.description}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span key={t} className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
