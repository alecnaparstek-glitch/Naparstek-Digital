import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Seo } from "@/components/Seo";
import { SERVICES } from "@/lib/data";

const Services = () => {
  return (
    <div data-testid="page-services" className="pt-40 md:pt-52">
      <Seo
        title="Services"
        description="Website design, redesigns, mobile optimization, landing pages, ongoing updates and full business website setup — everything your business needs online."
        path="/services"
      />
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 pb-20 md:pb-28">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-[#9A9A9A]">Services</p>
        </Reveal>
        <div className="mt-6 overflow-hidden">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-4xl sm:text-6xl md:text-8xl font-medium tracking-tighter leading-[0.9] max-w-4xl"
          >
            Everything your business needs{" "}
            <span className="font-accent italic font-normal text-[#9A9A9A]">online.</span>
          </motion.h1>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.num} delay={(i % 3) * 0.06}>
                <div
                  data-testid={`service-card-${s.num}`}
                  className="group relative h-full overflow-hidden border-b border-white/10 md:odd:border-r lg:border-r p-8 md:p-12 transition-colors hover:bg-[#111111]"
                >
                  <span className="pointer-events-none absolute -bottom-6 -right-2 font-heading text-8xl font-medium text-white/[0.04] select-none">
                    {s.num}
                  </span>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#9A9A9A]">{s.num}</p>
                  <h2 className="relative mt-6 font-heading text-2xl md:text-3xl font-medium tracking-tight">
                    {s.title}
                  </h2>
                  <p className="relative mt-5 text-base leading-relaxed text-[#9A9A9A]">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <div className="rounded-xl border border-white/12 bg-[#111111] p-10 md:p-20 relative overflow-hidden">
              <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/[0.05] blur-[120px]" />
              <p className="relative text-xs uppercase tracking-[0.3em] text-[#9A9A9A]">Have a project in mind?</p>
              <h2 className="relative mt-6 font-heading text-4xl md:text-6xl font-medium tracking-tighter max-w-2xl">
                Let's turn it into something worth clicking.
              </h2>
              <Link
                to="/contact"
                data-testid="services-lets-talk"
                className="relative mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-xs uppercase tracking-[0.14em] font-medium text-[#0A0A0A] transition-colors hover:bg-white/90"
              >
                Let's Talk <ArrowUpRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Services;
