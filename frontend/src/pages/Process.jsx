import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/Reveal";
import { PROCESS } from "@/lib/data";

const Step = ({ step, i }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.35"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.25, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      data-testid={`process-step-${step.num}`}
      className="relative grid grid-cols-12 gap-6 md:gap-10 py-14 md:py-20 border-t border-white/10"
    >
      <div className="col-span-12 md:col-span-2 flex md:block items-center gap-4">
        <span className="font-heading text-5xl md:text-7xl font-extrabold text-[#D45B3E]">{step.num}</span>
      </div>
      <div className="col-span-12 md:col-span-4">
        <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">{step.title}</h2>
      </div>
      <div className="col-span-12 md:col-span-6 flex items-center">
        <p className="text-base md:text-xl leading-relaxed text-[#8B8B93]">{step.desc}</p>
      </div>
    </motion.div>
  );
};

const Process = () => {
  return (
    <div data-testid="page-process" className="pt-40 md:pt-52">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <section className="grid grid-cols-12 gap-8 pb-16 md:pb-24">
          <div className="col-span-12 lg:col-span-8">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D45B3E]">The Process</p>
            </Reveal>
            <div className="mt-6 overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter leading-[0.9]"
              >
                From idea to <span className="font-accent italic font-normal text-[#D45B3E]">launch.</span>
              </motion.h1>
            </div>
          </div>
          <Reveal className="col-span-12 lg:col-span-4 flex items-end" delay={0.2}>
            <p className="text-base leading-relaxed text-[#8B8B93]">
              A clear, collaborative five-step process — so you always know exactly where your project stands.
            </p>
          </Reveal>
        </section>

        <section className="pb-28 md:pb-40 border-b border-white/10">
          {PROCESS.map((step, i) => (
            <Step key={step.num} step={step} i={i} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Process;
