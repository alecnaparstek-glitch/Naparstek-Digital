import { Link } from "react-router-dom";
import { ArrowUpRight, Mail } from "lucide-react";
import { Monogram } from "@/components/Monogram";
import { CONTACT_EMAIL, DISCIPLINES } from "@/lib/data";

export const Footer = () => {
  return (
    <footer data-testid="site-footer" className="border-t border-white/10 bg-[#0A0A0A]">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-[#9A9A9A]">Have a project in mind?</p>
            <h2 className="mt-6 font-heading text-4xl md:text-6xl font-medium tracking-tighter leading-[0.98]">
              Let's build your <span className="font-accent italic font-normal text-[#9A9A9A]">website.</span>
            </h2>
            <Link
              to="/contact"
              data-testid="footer-start-project"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-xs uppercase tracking-[0.14em] font-medium text-[#0A0A0A] transition-colors hover:bg-white/90"
            >
              Start a Project <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="md:col-span-5 grid grid-cols-2 gap-10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#9A9A9A] mb-5">Menu</p>
              <ul className="space-y-3">
                {["Home", "Work", "Services", "Process", "About", "Contact"].map((l) => (
                  <li key={l}>
                    <Link
                      to={l === "Home" ? "/" : `/${l.toLowerCase()}`}
                      className="text-sm text-[#F5F5F5] hover:text-[#9A9A9A] transition-colors"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#9A9A9A] mb-5">Contact</p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                data-testid="footer-email"
                className="flex items-center gap-2 text-sm text-[#F5F5F5] hover:text-[#9A9A9A] transition-colors break-all"
              >
                <Mail size={14} className="text-[#9A9A9A] shrink-0" /> {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Monogram className="h-6 w-6 text-[#F5F5F5]" strokeWidth={4} />
            <span className="font-heading text-xs font-medium tracking-[0.28em] uppercase">Naparstek Digital</span>
          </div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#9A9A9A]">
            {DISCIPLINES.join("  •  ")}
          </p>
          <p className="text-xs text-[#9A9A9A]">© {new Date().getFullYear()} Naparstek Digital</p>
        </div>
      </div>
    </footer>
  );
};
