import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Monogram } from "@/components/Monogram";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/process", label: "Process" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Wordmark = () => (
  <div className="flex items-center gap-3">
    <Monogram className="h-7 w-7 text-[#F5F5F5]" strokeWidth={4} />
    <span className="hidden sm:block font-heading text-sm font-medium tracking-[0.28em] text-[#F5F5F5] uppercase">
      Naparstek <span className="text-[#9A9A9A]">Digital</span>
    </span>
  </div>
);

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        data-testid="main-navbar"
        className={`fixed top-0 left-0 right-0 z-[100] transition-colors duration-500 ${
          scrolled ? "bg-[#0A0A0A]/75 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-20 flex items-center justify-between">
          <Link to="/" data-testid="nav-logo">
            <Wordmark />
          </Link>

          <nav className="hidden lg:flex items-center gap-9">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                data-testid={`nav-link-${l.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `text-xs uppercase tracking-[0.18em] link-underline transition-colors ${
                    isActive ? "text-[#F5F5F5]" : "text-[#9A9A9A] hover:text-[#F5F5F5]"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              data-testid="nav-start-project"
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-2.5 text-xs uppercase tracking-[0.14em] font-medium text-[#F5F5F5] transition-colors hover:bg-white hover:text-[#0A0A0A]"
            >
              Start a Project <ArrowUpRight size={15} />
            </Link>
            <button
              data-testid="mobile-menu-toggle"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden text-[#F5F5F5] p-2"
              aria-label="Menu"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] bg-[#0A0A0A] lg:hidden pt-24 px-6"
          >
            <nav className="flex flex-col">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === "/"}
                    onClick={() => setOpen(false)}
                    data-testid={`mobile-nav-link-${l.label.toLowerCase()}`}
                    className="block py-4 border-b border-white/10 font-heading text-3xl font-medium tracking-tight text-[#F5F5F5]"
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              data-testid="mobile-start-project"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm uppercase tracking-[0.14em] font-medium text-[#0A0A0A]"
            >
              Start a Project <ArrowUpRight size={18} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
