import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { CARE, DESIGNER_NAME } from "@/lib/data";

const PORTRAIT =
  "https://images.unsplash.com/photo-1558730234-d8b2281b0d00?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000";

const About = () => {
  return (
    <div data-testid="page-about" className="pt-40 md:pt-52">
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 pb-20 md:pb-28">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D45B3E]">About</p>
        </Reveal>
        <div className="mt-6 overflow-hidden">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter leading-[0.9]"
          >
            Built with <span className="font-accent italic font-normal text-[#D45B3E]">purpose.</span>
          </motion.h1>
        </div>
      </section>

      {/* Manifesto */}
      <section className="border-t border-white/10 py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid grid-cols-12 gap-8">
          <Reveal className="col-span-12 lg:col-span-2">
            <p className="text-xs uppercase tracking-[0.2em] text-[#8B8B93]">Manifesto</p>
          </Reveal>
          <div className="col-span-12 lg:col-span-10">
            <Reveal>
              <p className="font-heading text-2xl md:text-4xl font-medium leading-[1.25] tracking-tight">
                I'm a young entrepreneur building websites for small and local businesses. I'm{" "}
                <span className="font-accent italic font-normal text-[#D45B3E]">ambitious, hands-on</span>, and
                genuinely obsessive about the details that make a website feel professional — the spacing, the
                typography, the way a page loads and moves.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 text-base md:text-lg leading-relaxed text-[#8B8B93] max-w-3xl">
                I love combining design, technology, and entrepreneurship. Every project is a chance to help a real
                business look sharper online and give its customers a better experience — and I take that
                seriously.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Profile */}
      <section className="border-t border-white/10 py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid grid-cols-12 gap-10 lg:gap-16 items-center">
          <Reveal className="col-span-12 lg:col-span-5">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#16161A] aspect-[4/5]">
                <img
                  src={PORTRAIT}
                  alt={DESIGNER_NAME}
                  data-testid="about-portrait"
                  className="w-full h-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 rounded-xl bg-[#D45B3E] px-5 py-3">
                <p className="font-heading font-bold text-sm text-[#F4F4F1]">{DESIGNER_NAME}</p>
                <p className="text-[11px] text-[#F4F4F1]/70">Web Designer & Developer</p>
              </div>
            </div>
          </Reveal>

          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">
                A hands-on designer who cares about the outcome.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-base md:text-lg leading-relaxed text-[#8B8B93]">
                I handle everything myself — from the first conversation to launch. That means clear communication,
                no runaround, and a website built specifically around your business rather than forced into a
                generic template. It's a more personal, affordable alternative to a traditional agency.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What I care about */}
      <section className="border-t border-white/10 py-28 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <h2 className="font-heading text-4xl md:text-6xl font-extrabold tracking-tighter mb-16">
              What I care <span className="font-accent italic font-normal text-[#D45B3E]">about.</span>
            </h2>
          </Reveal>
          <div className="border-t border-white/10">
            {CARE.map((c, i) => (
              <Reveal key={c} delay={i * 0.05}>
                <div className="group flex items-baseline gap-6 md:gap-12 border-b border-white/10 py-8 md:py-10 transition-colors hover:bg-[#16161A] px-2 md:px-4">
                  <span className="font-accent italic text-xl md:text-2xl text-[#D45B3E] w-10">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-heading text-2xl md:text-4xl font-medium tracking-tight">{c}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
