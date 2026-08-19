import { Reveal } from "@/components/Reveal";
import { TESTIMONIALS } from "@/lib/data";

export const Testimonials = () => {
  if (!TESTIMONIALS || TESTIMONIALS.length === 0) return null;

  return (
    <section data-testid="testimonials" className="border-t border-white/10 py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-[#9A9A9A]">Kind Words</p>
          <h2 className="mt-4 font-heading text-4xl md:text-6xl font-medium tracking-tighter">
            What clients <span className="font-accent italic font-normal text-[#9A9A9A]">say.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px bg-white/10 border border-white/10 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={(i % 2) * 0.08}>
              <figure className="h-full bg-[#0A0A0A] p-8 md:p-12 flex flex-col justify-between transition-colors hover:bg-[#111111]">
                <span className="font-accent text-6xl leading-none text-white/15 select-none">“</span>
                <blockquote className="mt-2 font-accent italic text-2xl md:text-3xl leading-snug text-[#F5F5F5]">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-10 pt-6 border-t border-white/10">
                  <p className="font-heading text-sm font-medium tracking-[0.16em] uppercase text-[#F5F5F5]">
                    {t.name}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#9A9A9A]">{t.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
