import { Reveal } from "@/components/Reveal";
import { TESTIMONIALS } from "@/lib/data";

export const FeaturedQuote = () => {
  const t = (TESTIMONIALS || []).find((x) => x.featured);
  if (!t) return null;

  return (
    <section data-testid="featured-quote" className="border-t border-white/10 py-28 md:py-40">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-[#9A9A9A]">Kind Words</p>
        </Reveal>
        <Reveal delay={0.1}>
          <blockquote className="mt-10 font-accent italic text-3xl md:text-5xl leading-[1.25] tracking-tight text-[#F5F5F5]">
            <span className="text-white/20">“</span>
            {t.quote}
            <span className="text-white/20">”</span>
          </blockquote>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-12 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-white/25" />
            <div className="text-left">
              <p className="font-heading text-sm font-medium tracking-[0.16em] uppercase text-[#F5F5F5]">
                {t.name}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#9A9A9A]">{t.role}</p>
            </div>
            <span className="h-px w-10 bg-white/25" />
          </div>
        </Reveal>
      </div>
    </section>
  );
};
