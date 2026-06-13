import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-[image:var(--gradient-brand)] text-primary-foreground font-bold">F</span>
            <span className="text-lg tracking-tight">FlairTech <span className="text-brand">Solutions</span></span>
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            A global IT consulting partner delivering business intelligence, cloud, ERP, and quality engineering to enterprise clients across the US and India.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About Us</Link></li>
            <li><Link to="/services" className="hover:text-foreground">Services</Link></li>
            <li><Link to="/careers" className="hover:text-foreground">Careers</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Reach us</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 text-brand" /><span>6900 Dallas Pkwy, Suite 200<br />Plano, TX 75024, USA</span></li>
            <li className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 text-brand" /><a href="mailto:hr@flairtechsolutions.com" className="hover:text-foreground">hr@flairtechsolutions.com</a></li>
            <li className="flex gap-2"><Clock className="mt-0.5 h-4 w-4 text-brand" /><span>Mon – Fri, 9:00 AM – 6:00 PM CST</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} FlairTech Solutions. All rights reserved.</p>
          <p>Built with care for our clients and candidates.</p>
        </div>
      </div>
    </footer>
  );
}
