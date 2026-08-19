import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { BrowserMockup } from "@/components/BrowserMockup";
import { REAL_PROJECTS, CONCEPTS } from "@/lib/data";

const Work = () => {
  return (
    <div data-testid="page-work" className="pt-40 md:pt-52">
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 pb-20 md:pb-28">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D45B3E]">Portfolio</p>
        </Reveal>
        <div className="mt-6 overflow-hidden">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-5xl md:text-8xl font-extrabold tracking-tighter leading-[0.9]"
          >
            Selected Work
          </motion.h1>
        </div>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-xl text-base md:text-lg leading-relaxed text-[#8B8B93]">
            A look at some of the websites I've designed and built.
          </p>
        </Reveal>
      </section>

      {/* Real projects */}
      <section className="border-t border-white/10">
        {REAL_PROJECTS.map((p) => (
          <div key={p.slug} className="border-b border-white/10">
            <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28 grid grid-cols-12 gap-8 lg:gap-14 items-center">
              <Reveal className="col-span-12 lg:col-span-7">
                <a href={p.url} target="_blank" rel="noopener noreferrer" data-testid={`work-mockup-${p.slug}`}>
                  <BrowserMockup src={p.shot} fallback={p.fallback} url={p.url} alt={p.title} />
                </a>
              </Reveal>
              <div className="col-span-12 lg:col-span-5">
                <Reveal>
                  <div className="flex items-baseline gap-4">
                    <span className="font-accent italic text-3xl text-[#D45B3E]">{p.index}</span>
                    <span className="text-xs uppercase tracking-[0.2em] text-[#8B8B93]">{p.category}</span>
                  </div>
                  <h2 className="mt-5 font-heading text-3xl md:text-5xl font-bold tracking-tight">{p.title}</h2>
                  <p className="mt-6 text-base leading-relaxed text-[#8B8B93]">{p.description}</p>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="mt-8 text-xs uppercase tracking-[0.2em] text-[#8B8B93]">Design Focus</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.highlights.map((h) => (
                      <span
                        key={h}
                        className="rounded-full border border-white/15 px-4 py-2 text-xs text-[#F4F4F1]"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`work-live-${p.slug}`}
                    className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#D45B3E] px-8 py-4 text-sm font-medium text-[#F4F4F1] transition-transform hover:scale-[1.03] active:scale-[0.98]"
                  >
                    View Live Site <ArrowUpRight size={16} />
                  </a>
                </Reveal>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Design Concepts */}
      <section className="py-28 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D45B3E]">Design Concepts</p>
              <h2 className="mt-4 font-heading text-4xl md:text-6xl font-extrabold tracking-tighter">
                Exploring different <span className="font-accent italic font-normal text-[#D45B3E]">styles.</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[#8B8B93]">
                Self-initiated concept designs created purely to demonstrate range across industries. These are not
                real clients — they're studies in what a great website could look like.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {CONCEPTS.map((c, i) => (
              <Reveal key={c.title} delay={(i % 2) * 0.08}>
                <div className="group">
                  <div className="rounded-xl border border-white/10 bg-[#16161A] overflow-hidden">
                    <div className="h-9 border-b border-white/10 bg-[#1A1A1E] flex items-center px-4 gap-2">
                      <span className="w-2 h-2 rounded-full bg-white/20" />
                      <span className="w-2 h-2 rounded-full bg-white/20" />
                      <span className="w-2 h-2 rounded-full bg-white/20" />
                    </div>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={c.image}
                        alt={c.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                      />
                      <span
                        data-testid="concept-label"
                        className="absolute left-4 top-4 rounded-full bg-[#0D0D0F]/80 backdrop-blur px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[#D45B3E] border border-white/10"
                      >
                        {c.label}
                      </span>
                    </div>
                  </div>
                  <div className="mt-5 flex items-baseline justify-between">
                    <h3 className="font-heading text-xl md:text-2xl font-medium">{c.title}</h3>
                    <span className="text-xs uppercase tracking-[0.18em] text-[#8B8B93]">{c.category}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Work;
