import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Mail, MapPin, Clock, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — FlairTech Solutions" },
      { name: "description", content: "Get in touch with FlairTech Solutions. Offices in Plano, TX (USA) and Hyderabad (India)." },
      { property: "og:title", content: "Contact FlairTech Solutions" },
      { property: "og:description", content: "Reach our US and India teams for new projects, careers, and partnerships." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const mutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("contacts").insert(form);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Message sent", { description: "Thanks for contacting FlairTech Solutions, we'll be in touch shortly." });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    },
    onError: (e: Error) => toast.error("Could not send message", { description: e.message }),
  });

  return (
    <div>
      <section className="bg-[image:var(--gradient-hero)] py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground/70">Contact us</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold sm:text-5xl">Let's talk about what's next.</h1>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/85">Tell us about your project, your team, or your career — we'll get back within one business day.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-bold">Send us a message</h2>
          <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); mutation.mutate(); }}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" required>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
              </Field>
              <Field label="Email" required>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Phone">
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" />
              </Field>
              <Field label="Subject" required>
                <input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input" />
              </Field>
            </div>
            <Field label="Message" required>
              <textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input" />
            </Field>
            <button type="submit" disabled={mutation.isPending} className="inline-flex items-center justify-center gap-2 rounded-md bg-[image:var(--gradient-brand)] px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-95 disabled:opacity-60">
              {mutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              Send message
            </button>
          </form>
          <style>{`.input{display:block;width:100%;border-radius:0.5rem;border:1px solid var(--color-border);background:var(--color-background);padding:0.55rem 0.75rem;font-size:0.875rem;outline:none}.input:focus{border-color:var(--color-ring);box-shadow:0 0 0 3px color-mix(in oklab, var(--color-ring) 25%, transparent)}`}</style>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <h2 className="text-2xl font-bold">Office locations</h2>

          <OfficeCard title="United States — Headquarters" address={["6900 Dallas Pkwy, Suite 200", "Plano, TX 75024, USA"]} hours="Mon – Fri, 9:00 AM – 6:00 PM CST" />
          <OfficeCard title="India — Delivery Center" address={["Cyber Towers, HITEC City", "Hyderabad, Telangana 500081"]} hours="Mon – Fri, 9:30 AM – 6:30 PM IST" />

          <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="font-semibold">HR & Careers</h3>
            <a href="mailto:hr@flairtechsolutions.com" className="mt-2 flex items-center gap-2 text-sm text-brand hover:underline">
              <Mail className="h-4 w-4" /> hr@flairtechsolutions.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function OfficeCard({ title, address, hours }: { title: string; address: string[]; hours: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-3 flex gap-2 text-sm text-muted-foreground"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" /><span>{address.map((l, i) => <span key={i}>{l}<br /></span>)}</span></p>
      <p className="mt-2 flex gap-2 text-sm text-muted-foreground"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand" />{hours}</p>
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
