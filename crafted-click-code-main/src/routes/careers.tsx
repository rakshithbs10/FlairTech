import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Briefcase, MapPin, Users, Calendar, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — FlairTech Solutions" },
      { name: "description", content: "Join FlairTech Solutions. Browse open roles across our US and India offices and apply online." },
      { property: "og:title", content: "Careers at FlairTech Solutions" },
      { property: "og:description", content: "Open roles across consulting, engineering, BI, and QA." },
    ],
  }),
  component: Careers,
});

type Job = {
  id: string;
  title: string;
  description: string;
  location: string;
  technologies: string[];
  number_of_positions: number;
  posted_at: string;
};

function Careers() {
  const [applyJob, setApplyJob] = useState<Job | null>(null);

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("is_active", true)
        .order("posted_at", { ascending: false });
      if (error) throw error;
      return data as Job[];
    },
  });

  return (
    <div>
      <section className="bg-[image:var(--gradient-hero)] py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground/70">Careers</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold sm:text-5xl">Build a career that matters.</h1>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/85">We're growing across consulting, engineering, and delivery. Find your next role below.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <Briefcase className="h-5 w-5 text-brand" />
          <h2 className="text-2xl font-bold">Open positions {jobs && <span className="text-muted-foreground font-normal">({jobs.length})</span>}</h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-brand" /></div>
        ) : !jobs || jobs.length === 0 ? (
          <p className="text-muted-foreground">No open positions right now. Check back soon.</p>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <article key={job.id} className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition hover:border-brand/40 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-brand" />{job.location}</span>
                      <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-brand" />{job.number_of_positions} position{job.number_of_positions > 1 ? "s" : ""}</span>
                      <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-brand" />Posted {new Date(job.posted_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button onClick={() => setApplyJob(job)} className="inline-flex items-center justify-center rounded-md bg-[image:var(--gradient-brand)] px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-95">Apply now</button>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{job.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {job.technologies.map((t) => (
                    <span key={t} className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">{t}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {applyJob && <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />}
    </div>
  );
}

function ApplyModal({ job, onClose }: { job: Job; onClose: () => void }) {
  const [form, setForm] = useState({ fullName: "", email: "", phone: "" });
  const [file, setFile] = useState<File | null>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!file) throw new Error("Please attach your resume (PDF).");
      if (file.type !== "application/pdf") throw new Error("Resume must be a PDF.");
      if (file.size > 5 * 1024 * 1024) throw new Error("Resume must be 5MB or smaller.");

      const ext = "pdf";
      const path = `${job.id}/${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("resumes").upload(path, file, { contentType: "application/pdf" });
      if (upErr) throw upErr;

      const { error } = await supabase.from("applications").insert({
        job_id: job.id,
        job_title: job.title,
        full_name: form.fullName,
        email: form.email,
        phone: form.phone,
        resume_url: path,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Application submitted", { description: `Thanks for applying to ${job.title}. Our team will be in touch.` });
      onClose();
    },
    onError: (e: Error) => toast.error("Could not submit application", { description: e.message }),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg rounded-xl bg-card p-6 shadow-[var(--shadow-elegant)] sm:p-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Apply</p>
            <h3 className="mt-1 text-xl font-bold">{job.title}</h3>
            <p className="text-sm text-muted-foreground">{job.location}</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-md p-1 hover:bg-secondary"><X className="h-5 w-5" /></button>
        </div>
        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => { e.preventDefault(); mutation.mutate(); }}
        >
          <Field label="Full name" required>
            <input required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="input" />
          </Field>
          <Field label="Email" required>
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
          </Field>
          <Field label="Phone" required>
            <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" />
          </Field>
          <Field label="Resume (PDF, max 5MB)" required>
            <input required type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="block w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-2 file:text-sm file:font-medium file:text-foreground hover:file:bg-accent" />
          </Field>
          <button type="submit" disabled={mutation.isPending} className="flex w-full items-center justify-center gap-2 rounded-md bg-[image:var(--gradient-brand)] px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-95 disabled:opacity-60">
            {mutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Submit application
          </button>
        </form>
      </div>
      <style>{`.input{display:block;width:100%;border-radius:0.5rem;border:1px solid var(--color-border);background:var(--color-background);padding:0.55rem 0.75rem;font-size:0.875rem;outline:none}.input:focus{border-color:var(--color-ring);box-shadow:0 0 0 3px color-mix(in oklab, var(--color-ring) 25%, transparent)}`}</style>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}{required && <span className="text-destructive"> *</span>}</span>
      {children}
    </label>
  );
}
