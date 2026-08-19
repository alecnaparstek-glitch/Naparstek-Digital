import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { CONTACT_EMAIL, DESIGNER_NAME } from "../lib/data";

export const Footer = () => {
  return (
    <footer data-testid="site-footer" className="border-t border-white/10 bg-[#0D0D0F]">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D45B3E]">Have a project in mind?</p>
            <h2 className="mt-6 font-heading text-4xl md:text-6xl font-extrabold tracking-tighter leading-[0.95]">
              Let's build your <span className="font-accent italic font-normal text-[#D45B3E]">website.</span>
            </h2>
            <Link
              to="/contact"
              data-testid="footer-start-project"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#D45B3E] px-8 py-4 text-sm font-medium text-[#F4F4F1] transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Start a Project <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="md:col-span-5 grid grid-cols-2 gap-10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#8B8B93] mb-5">Menu</p>
              <ul className="space-y-3">
                {["Home", "Work", "Services", "Process", "About", "Contact"].map((l) => (
                  <li key={l}>
                    <Link
                      to={l === "Home" ? "/" : `/${l.toLowerCase()}`}
                      className="text-sm text-[#F4F4F1] hover:text-[#D45B3E] transition-colors"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#8B8B93] mb-5">Contact</p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                data-testid="footer-email"
                className="text-sm text-[#F4F4F1] hover:text-[#D45B3E] transition-colors break-all"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-heading font-extrabold tracking-tight">
            alec<span className="text-[#D45B3E]">.</span>studio
          </p>
          <p className="text-xs text-[#8B8B93]">
            © {new Date().getFullYear()} {DESIGNER_NAME}. Designed & built with intent.
          </p>
        </div>
      </div>
    </footer>
  );
};
