import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight, Quote } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import { SERVICES } from "@/lib/services";

const slides = [
  { image: hero1, eyebrow: "Trusted partner", title: "Engineering the digital backbone of modern enterprises", body: "From data platforms to cloud-native apps, we ship technology that scales with your business." },
  { image: hero2, eyebrow: "Decisions, not dashboards", title: "Turn enterprise data into a competitive advantage", body: "BI, analytics, and ML programs that put trusted insights in the hands of every decision-maker." },
  { image: hero3, eyebrow: "Always-on infrastructure", title: "Cloud and infrastructure engineering you can rely on", body: "Resilient, secure, and observable platforms designed for 24×7 mission-critical workloads." },
];

const testimonials = [
  { quote: "FlairTech transformed our reporting pipeline and gave our leadership a single source of truth. Their team felt like ours.", author: "VP, Data Engineering", company: "Fortune 500 Retailer" },
  { quote: "Their architects guided our Azure migration end-to-end. On time, on budget, zero downtime.", author: "Director of Cloud Operations", company: "National Healthcare Provider" },
  { quote: "Best QA partner we've worked with. They built automation that genuinely sped up our releases.", author: "Head of Engineering", company: "FinTech Platform" },
];

export default function Home() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      <section className="relative isolate overflow-hidden">
        <div className="relative h-[78vh] min-h-[520px] w-full">
          {slides.map((s, idx) => (
            <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ${i === idx ? "opacity-100" : "opacity-0"}`}>
              <img src={s.image} alt="" width={1600} height={900} className="absolute inset-0 h-full w-full object-cover" loading={idx === 0 ? "eager" : "lazy"} />
              <div className="absolute inset-0 bg-[image:var(--gradient-hero)] opacity-80" />
            </div>
          ))}
          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-foreground/80">{slides[i].eyebrow}</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold text-primary-foreground sm:text-5xl lg:text-6xl">{slides[i].title}</h1>
            <p className="mt-5 max-w-2xl text-lg text-primary-foreground/85">{slides[i].body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/services" className="inline-flex items-center gap-2 rounded-md bg-primary-foreground px-5 py-3 text-sm font-semibold text-primary shadow-lg transition hover:bg-primary-foreground/90">
                Explore services <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/30 px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-foreground/10">
                Talk to us
              </Link>
            </div>
            <div className="mt-10 flex gap-2">
              {slides.map((_, idx) => (
                <button key={idx} onClick={() => setI(idx)} aria-label={`Go to slide ${idx + 1}`} className={`h-1.5 rounded-full transition-all ${i === idx ? "w-10 bg-primary-foreground" : "w-5 bg-primary-foreground/40"}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Welcome to FTS</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">A consulting partner built around outcomes, not hours.</h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>FlairTech Solutions is a global IT services firm helping enterprises modernize their data, applications, and infrastructure. Our consultants bring deep platform expertise across the Microsoft, Oracle, and open-source ecosystems.</p>
            <p>With delivery hubs in the United States and India, we partner with Fortune 500 customers and high-growth companies to deliver measurable business value — faster, safer, and with a long-term mindset.</p>
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">What we do</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Services that move the business forward</h2>
            </div>
            <Link to="/services" className="text-sm font-semibold text-brand hover:underline">View all services →</Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.title} className="group rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-brand/40">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-[image:var(--gradient-brand)] text-primary-foreground">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span key={t} className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Client voices</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Trusted by teams that ship</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <figure key={idx} className="rounded-xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
              <Quote className="h-7 w-7 text-brand/70" />
              <blockquote className="mt-4 text-base text-foreground">"{t.quote}"</blockquote>
              <figcaption className="mt-6 border-t border-border pt-4 text-sm">
                <div className="font-semibold">{t.author}</div>
                <div className="text-muted-foreground">{t.company}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}