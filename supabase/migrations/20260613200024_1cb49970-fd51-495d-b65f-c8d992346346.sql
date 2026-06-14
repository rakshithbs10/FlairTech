
CREATE TABLE public.jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  technologies text[] NOT NULL DEFAULT '{}',
  number_of_positions int NOT NULL DEFAULT 1,
  posted_at timestamptz NOT NULL DEFAULT now(),
  is_active boolean NOT NULL DEFAULT true
);
GRANT SELECT ON public.jobs TO anon, authenticated;
GRANT ALL ON public.jobs TO service_role;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active jobs" ON public.jobs FOR SELECT USING (is_active = true);

CREATE TABLE public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES public.jobs(id) ON DELETE SET NULL,
  job_title text NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  resume_url text NOT NULL,
  applied_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.applications TO anon, authenticated;
GRANT ALL ON public.applications TO service_role;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an application" ON public.applications FOR INSERT WITH CHECK (true);

CREATE TABLE public.contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  submitted_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contacts TO anon, authenticated;
GRANT ALL ON public.contacts TO service_role;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a contact" ON public.contacts FOR INSERT WITH CHECK (true);

INSERT INTO public.jobs (title, description, location, technologies, number_of_positions) VALUES
('Senior Full Stack Developer', 'Build and maintain scalable enterprise web applications across our client portfolio. Work with modern frameworks and cloud platforms.', 'Dallas, TX (Hybrid)', ARRAY['React','Node.js','TypeScript','Azure SQL'], 2),
('Business Intelligence Engineer', 'Design and deliver BI dashboards, ETL pipelines, and analytics solutions using Power BI and the Microsoft data stack.', 'Hyderabad, India', ARRAY['Power BI','SSIS','SQL Server','DAX'], 3),
('Azure Cloud Solutions Architect', 'Architect cloud-native solutions on Azure for Fortune 500 clients. Lead infrastructure design, security review, and migration.', 'Remote (US)', ARRAY['Azure','Bicep','Kubernetes','DevOps'], 1),
('QA Automation Engineer', 'Build automated test frameworks for web and API platforms. Own end-to-end quality across releases.', 'Bangalore, India', ARRAY['Selenium','Playwright','TypeScript','CI/CD'], 2),
('SAP ERP Consultant', 'Implement and customize SAP modules for enterprise clients. Lead requirements workshops and configuration.', 'Plano, TX', ARRAY['SAP','ABAP','S/4HANA','Fiori'], 1);
