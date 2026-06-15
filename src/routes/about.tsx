import { Building2, MapPin } from "lucide-react";

export default function About() {
  return (
    <div>
      <section className="bg-[image:var(--gradient-hero)] py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground/70">About us</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold sm:text-5xl">Engineers, architects, and consultants on a single mission.</h1>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/85">
            For over a decade, FlairTech Solutions has helped enterprises modernize how they build, run, and scale technology.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold">Who we are</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>FlairTech Solutions is a global IT services firm specializing in business intelligence, enterprise resource planning, cloud infrastructure, quality engineering, and database services.</p>
            <p>Our consultants combine deep platform expertise with a pragmatic, outcome-focused delivery model. We work as an extension of your team — embedded, accountable, and aligned with your business goals.</p>
            <p>From Fortune 500 enterprises to high-growth scale-ups, our clients choose us because we deliver: on time, on budget, and built to last.</p>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold">Our mission</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>To be the most trusted technology partner for the enterprises we serve — combining world-class engineering with the agility and care of a boutique consultancy.</p>
            <p>We believe great software is built by great teams. That's why we invest in our people, our craft, and the long-term relationships we form with every client.</p>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[{ n: "10+", l: "Years" }, { n: "150+", l: "Consultants" }, { n: "60+", l: "Clients" }].map((s) => (
              <div key={s.l} className="rounded-xl border border-border bg-card p-4 text-center">
                <div className="text-3xl font-bold text-brand">{s.n}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Global presence</p>
          <h2 className="mt-3 text-3xl font-bold">Our offices</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-[image:var(--gradient-brand)] text-primary-foreground">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">United States — Headquarters</h3>
                  <p className="text-sm text-muted-foreground">Sales, delivery, and onshore consulting</p>
                </div>
              </div>
              <div className="mt-5 space-y-2 text-sm text-muted-foreground">
                <p className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 text-brand" />6900 Dallas Pkwy, Suite 200<br />Plano, TX 75024</p>
                <p>Hours: Mon – Fri, 9:00 AM – 6:00 PM CST</p>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-[image:var(--gradient-brand)] text-primary-foreground">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">India — Delivery Center</h3>
                  <p className="text-sm text-muted-foreground">Engineering, BI, QA, and 24×7 support</p>
                </div>
              </div>
              <div className="mt-5 space-y-2 text-sm text-muted-foreground">
                <p className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 text-brand" />Cyber Towers, HITEC City<br />Hyderabad, Telangana 500081</p>
                <p>Hours: Mon – Fri, 9:30 AM – 6:30 PM IST</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
