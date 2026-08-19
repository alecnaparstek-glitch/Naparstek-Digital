import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Marquee from "react-fast-marquee";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { BrowserMockup } from "@/components/BrowserMockup";
import { Monogram } from "@/components/Monogram";
import { REAL_PROJECTS, WHY, DISCIPLINES } from "@/lib/data";

const HERO_LINES = [
  [{ t: "Websites That" }],
  [{ t: "Make Businesses" }],
  [{ t: "Stand ", accent: false }, { t: "Out.", accent: true }],
];

const KineticHero = () => {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-40 pb-24 md:pt-52 md:pb-32">
      <div className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-white/[0.04] blur-[150px]" />
      <div className="pointer-events-none absolute top-1/3 -left-40 h-[400px] w-[400px] rounded-full bg-white/[0.03] blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 grid grid-cols-12 gap-8 items-end">
        <div className="col-span-12 lg:col-span-9">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[#9A9A9A]"
          >
            <span className="h-px w-10 bg-[#9A9A9A]" /> Naparstek Digital — Web Design Studio
          </motion.p>

          <h1 className="font-heading font-medium tracking-tighter leading-[0.9] text-[13vw] sm:text-[10vw] lg:text-[7.4rem]">
            {HERO_LINES.map((line, li) => (
              <span key={li} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={{ y: reduce ? 0 : "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.15 + li * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line.map((w, wi) =>
                    w.accent ? (
                      <span key={wi} className="font-accent italic font-normal text-[#9A9A9A]">
                        {w.t}
                      </span>
                    ) : (
                      <span key={wi}>{w.t}</span>
                    )
                  )}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        <div className="col-span-12 lg:col-span-3 hidden lg:flex justify-end">
          <motion.div style={{ y }} className="relative h-28 w-28">
            <div className="spin-slow h-full w-full">
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <defs>
                  <path id="circlePath" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                </defs>
                <text className="fill-[#9A9A9A] text-[8px] uppercase tracking-[0.35em] font-medium">
                  <textPath href="#circlePath">Small business • local business • </textPath>
                </text>
              </svg>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Monogram className="h-9 w-9 text-[#F5F5F5]" strokeWidth={4} />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="relative mx-auto max-w-[1400px] px-6 md:px-10 mt-12 grid grid-cols-12 gap-8"
      >
        <p className="col-span-12 md:col-span-6 lg:col-span-5 text-base md:text-lg leading-relaxed text-[#9A9A9A]">
          I design modern, professional websites for local businesses that want to look better online and turn
          visitors into customers.
        </p>
        <div className="col-span-12 md:col-span-6 lg:col-span-7 flex flex-wrap items-center gap-4 md:justify-end">
          <Link
            to="/work"
            data-testid="hero-view-work"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-xs uppercase tracking-[0.14em] font-medium text-[#F5F5F5] transition-colors hover:bg-white/5"
          >
            View My Work <ArrowRight size={16} />
          </Link>
          <Link
            to="/contact"
            data-testid="hero-start-project"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-xs uppercase tracking-[0.14em] font-medium text-[#0A0A0A] transition-colors hover:bg-white/90"
          >
            Start a Project <ArrowUpRight size={16} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

const Home = () => {
  return (
    <div data-testid="page-home">
      <KineticHero />

      <div className="border-y border-white/10 py-6">
        <Marquee speed={30} gradient={false} className="overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="font-heading text-sm md:text-base uppercase tracking-[0.35em] text-[#9A9A9A] mx-8">
              {DISCIPLINES.join("  —  ")}
              <span className="mx-8 text-[#F5F5F5]">/</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* Credibility */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-8">
          <Reveal className="col-span-12 lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-[#9A9A9A]">The Focus</p>
          </Reveal>
          <div className="col-span-12 lg:col-span-8">
            <Reveal>
              <h2 className="font-heading text-3xl md:text-5xl font-medium tracking-tight leading-[1.05]">
                I specialize in websites for{" "}
                <span className="text-[#9A9A9A]">small and local businesses</span> — the shops, services, and
                studios that make a neighborhood run.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 text-base md:text-lg leading-relaxed text-[#9A9A9A] max-w-2xl">
                No bloated agency process, no confusing jargon. Just thoughtful design, clean code, and a website
                that actually helps your business look the part and win more customers.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="border-t border-white/10 py-28 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <div className="flex items-end justify-between gap-6 mb-16">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#9A9A9A]">Featured Work</p>
                <h2 className="mt-4 font-heading text-4xl md:text-6xl font-medium tracking-tighter">
                  Selected projects.
                </h2>
              </div>
              <Link
                to="/work"
                data-testid="featured-all-work"
                className="hidden sm:inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[#9A9A9A] hover:text-[#F5F5F5] transition-colors whitespace-nowrap"
              >
                All work <ArrowUpRight size={16} />
              </Link>
            </div>
          </Reveal>

          <div className="space-y-24">
            {REAL_PROJECTS.map((p, i) => (
              <Reveal key={p.slug}>
                <div className="grid grid-cols-12 gap-8 lg:gap-14 items-center">
                  <div className={`col-span-12 lg:col-span-7 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                    <a href={p.url} target="_blank" rel="noopener noreferrer" data-testid={`featured-mockup-${p.slug}`}>
                      <BrowserMockup src={p.shot} fallback={p.fallback} url={p.url} alt={p.title} />
                    </a>
                  </div>
                  <div className={`col-span-12 lg:col-span-5 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <p className="font-accent italic text-3xl text-[#9A9A9A]">{p.index}</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[#9A9A9A]">{p.category}</p>
                    <h3 className="mt-4 font-heading text-3xl md:text-4xl font-medium tracking-tight">{p.title}</h3>
                    <p className="mt-5 text-base leading-relaxed text-[#9A9A9A]">{p.description}</p>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`featured-live-${p.slug}`}
                      className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-medium text-[#F5F5F5] link-underline"
                    >
                      View Live Site <ArrowUpRight size={16} className="text-[#9A9A9A]" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Businesses Choose Me */}
      <section className="border-t border-white/10 py-28 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <h2 className="font-heading text-4xl md:text-6xl font-medium tracking-tighter mb-16 max-w-3xl">
              Why businesses <span className="font-accent italic font-normal text-[#9A9A9A]">choose me.</span>
            </h2>
          </Reveal>
          <div className="grid gap-px bg-white/10 border border-white/10 md:grid-cols-3">
            {WHY.map((w, i) => (
              <Reveal key={w} delay={i * 0.05}>
                <div className="group h-full bg-[#0A0A0A] p-8 md:p-10 transition-colors hover:bg-[#111111]">
                  <p className="font-accent italic text-xl text-[#9A9A9A]">{String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-6 font-heading text-xl md:text-2xl font-medium leading-snug">{w}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
