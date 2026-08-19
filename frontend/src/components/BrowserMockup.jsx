import { useState } from "react";

// A sleek macOS-style browser window that frames a live screenshot.
export const BrowserMockup = ({ src, fallback, url, alt, className = "", tall = false }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const host = url ? url.replace(/^https?:\/\//, "").replace(/\/$/, "") : "";

  return (
    <div
      data-testid="browser-mockup"
      className={`group rounded-lg border border-white/12 bg-[#111111] overflow-hidden shadow-2xl shadow-black/60 ${className}`}
    >
      <div className="h-10 border-b border-white/10 bg-[#161616] flex items-center px-4 gap-2">
        <span className="w-2.5 h-2.5 rounded-full border border-white/25" />
        <span className="w-2.5 h-2.5 rounded-full border border-white/25" />
        <span className="w-2.5 h-2.5 rounded-full border border-white/25" />
        {host && (
          <div className="ml-3 flex-1 truncate rounded-sm bg-white/5 px-3 py-1 text-[11px] tracking-wide text-[#9A9A9A]">
            {host}
          </div>
        )}
      </div>
      <div className={`overflow-hidden ${tall ? "aspect-[4/5] sm:aspect-[16/12]" : "aspect-[16/10]"}`}>
        <img
          src={imgSrc}
          alt={alt}
          loading="lazy"
          onError={() => fallback && imgSrc !== fallback && setImgSrc(fallback)}
          className="w-full h-full object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
        />
      </div>
    </div>
  );
};
