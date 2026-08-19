import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Monogram } from "@/components/Monogram";
import { CARE } from "@/lib/data";

const About = () => {
  return (
    <div data-testid="page-about" className="pt-40 md:pt-52">
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 pb-20 md:pb-28">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-[#9A9A9A]">About</p>
        </Reveal>
        <div className="mt-6 overflow-hidden">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-5xl sm:text-7xl md:text-8xl font-medium tracking-tighter leading-[0.9]"
          >
            Built with <span className="font-accent italic font-normal text-[#9A9A9A]">purpose.</span>
          </motion.h1>
        </div>
      </section>

      {/* Manifesto */}
      <section className="border-t border-white/10 py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid grid-cols-12 gap-8">
          <Reveal className="col-span-12 lg:col-span-2">
            <p className="text-xs uppercase tracking-[0.2em] text-[#9A9A9A]">Built by a Local Entrepreneur</p>
          </Reveal>
          <div className="col-span-12 lg:col-span-10">
            <Reveal>
              <p className="font-heading text-2xl md:text-4xl font-medium leading-[1.25] tracking-tight">
                I'm a <span className="font-accent italic font-normal text-[#9A9A9A]">16-year-old high school
                student</span> from Olathe, Kansas, building modern websites for local businesses.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 text-base md:text-lg leading-relaxed text-[#9A9A9A] max-w-3xl">
                I started designing websites because I saw how much a professional online presence can help a
                business stand out and attract new customers. I combine creativity, technology, and a strong
                attention to detail to create websites that look great, work smoothly, and represent each business
                professionally.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Profile — monogram, no photo */}
      <section className="border-t border-white/10 py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid grid-cols-12 gap-10 lg:gap-16 items-center">
          <Reveal className="col-span-12 lg:col-span-5">
            <div className="relative">
              <div className="rounded-xl overflow-hidden border border-white/12 bg-[#111111] aspect-[4/5] flex items-center justify-center">
                <div className="pointer-events-none absolute inset-0 bg-white/[0.03] blur-3xl" />
                <Monogram
                  data-testid="about-monogram"
                  className="relative h-40 w-40 text-[#F5F5F5]"
                  strokeWidth={2.4}
                />
              </div>
              <div className="absolute -bottom-4 -right-4 border border-white/15 bg-[#0A0A0A] px-5 py-3">
                <p className="font-heading text-sm font-medium tracking-[0.2em] uppercase text-[#F5F5F5]">
                  Naparstek Digital
                </p>
                <p className="text-[11px] tracking-wide text-[#9A9A9A]">16-year-old student · Olathe, KS</p>
              </div>
            </div>
          </Reveal>

          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <h2 className="font-heading text-3xl md:text-5xl font-medium tracking-tight">
                A hands-on student who cares about the outcome.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-base md:text-lg leading-relaxed text-[#9A9A9A]">
                As a 16-year-old high school student, I handle every project personally — from the first
                conversation to launch. That means clear communication, no runaround, and a website built
                specifically around your business rather than forced into a generic template. It's a more personal,
                affordable alternative to a traditional agency, backed by genuine care for the details.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What I care about */}
      <section className="border-t border-white/10 py-28 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <h2 className="font-heading text-4xl md:text-6xl font-medium tracking-tighter mb-16">
              What I care <span className="font-accent italic font-normal text-[#9A9A9A]">about.</span>
            </h2>
          </Reveal>
          <div className="border-t border-white/10">
            {CARE.map((c, i) => (
              <Reveal key={c} delay={i * 0.05}>
                <div className="group flex items-baseline gap-6 md:gap-12 border-b border-white/10 py-8 md:py-10 transition-colors hover:bg-[#111111] px-2 md:px-4">
                  <span className="font-accent italic text-xl md:text-2xl text-[#9A9A9A] w-10">
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
