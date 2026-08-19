import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowUpRight, Check, Mail } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Seo } from "@/components/Seo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CONTACT_EMAIL, BUDGETS } from "@/lib/data";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const NEEDS = ["New Website", "Website Redesign", "Landing Page", "SEO", "Branding", "Mobile Optimization", "Website Updates", "Not sure yet"];

const fieldBase =
  "w-full bg-transparent border-b border-white/15 py-3 text-base text-[#F5F5F5] placeholder:text-[#9A9A9A]/60 focus:outline-none focus:border-[#F5F5F5] transition-colors";

const Field = ({ label, name, type = "text", value, onChange, placeholder, required }) => (
  <div>
    <label className="block text-xs uppercase tracking-[0.18em] text-[#9A9A9A] mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      data-testid={`contact-${name}`}
      className={fieldBase}
    />
  </div>
);

const Contact = () => {
  const [form, setForm] = useState({
    name: "", business_name: "", email: "", phone: "", current_website: "", need: "", budget: "", message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email, and project details.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/inquiries`, form);
      setSent(true);
      toast.success("Your inquiry has been sent. I'll be in touch soon!");
      setForm({ name: "", business_name: "", email: "", phone: "", current_website: "", need: "", budget: "", message: "" });
    } catch (err) {
      toast.error("Something went wrong. Please try again or email me directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="page-contact" className="pt-40 md:pt-52">
      <Seo
        title="Start a Project"
        description="Tell me about your business and what you're looking for, and let's build something great together."
        path="/contact"
      />
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 pb-16 md:pb-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-[#9A9A9A]">Start a Project</p>
        </Reveal>
        <div className="mt-6 overflow-hidden">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-5xl sm:text-7xl md:text-8xl font-medium tracking-tighter leading-[0.9]"
          >
            Let's build something <span className="font-accent italic font-normal text-[#9A9A9A]">great.</span>
          </motion.h1>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid grid-cols-12 gap-10 lg:gap-16 py-16 md:py-24">
          {/* Left */}
          <div className="col-span-12 lg:col-span-4">
            <Reveal>
              <p className="text-base md:text-lg leading-relaxed text-[#9A9A9A]">
                Tell me a bit about your business and what you have in mind — even if it's still rough. I read every
                message myself and usually get back to you within a day or two.
              </p>
              <div className="mt-12 space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#9A9A9A] mb-3">Email</p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    data-testid="contact-email-link"
                    className="flex items-center gap-3 font-heading text-lg md:text-xl font-medium text-[#F5F5F5] hover:text-[#9A9A9A] transition-colors break-all"
                  >
                    <Mail size={18} className="text-[#9A9A9A] shrink-0" /> {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
              <div className="mt-10 space-y-3">
                {["A website built around your business", "Clear communication throughout", "Modern, mobile-friendly design"].map((x) => (
                  <div key={x} className="flex items-center gap-3 text-sm text-[#9A9A9A]">
                    <Check size={16} className="text-[#F5F5F5]" /> {x}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right - form */}
          <div className="col-span-12 lg:col-span-8">
            {sent ? (
              <Reveal>
                <div
                  data-testid="contact-success"
                  className="rounded-xl border border-white/12 bg-[#111111] p-12 text-center"
                >
                  <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white">
                    <Check size={26} className="text-[#0A0A0A]" />
                  </div>
                  <h2 className="font-heading text-3xl font-medium">Message sent.</h2>
                  <p className="mt-4 text-[#9A9A9A]">Thanks for reaching out — I'll get back to you shortly.</p>
                  <button
                    onClick={() => setSent(false)}
                    data-testid="contact-send-another"
                    className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-xs uppercase tracking-[0.14em] text-[#F5F5F5] hover:bg-white/5 transition-colors"
                  >
                    Send another inquiry
                  </button>
                </div>
              </Reveal>
            ) : (
              <Reveal>
                <form onSubmit={onSubmit} data-testid="contact-form" className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <Field label="Name" name="name" value={form.name} onChange={onChange} placeholder="Your name" required />
                  <Field label="Business Name" name="business_name" value={form.business_name} onChange={onChange} placeholder="Your business" />
                  <Field label="Email" name="email" type="email" value={form.email} onChange={onChange} placeholder="you@example.com" required />
                  <Field label="Phone" name="phone" value={form.phone} onChange={onChange} placeholder="(000) 000-0000" />
                  <Field label="Current Website" name="current_website" value={form.current_website} onChange={onChange} placeholder="yoursite.com (if any)" />

                  <div>
                    <label className="block text-xs uppercase tracking-[0.18em] text-[#9A9A9A] mb-2">What do you need?</label>
                    <Select value={form.need} onValueChange={(v) => setForm((f) => ({ ...f, need: v }))}>
                      <SelectTrigger
                        data-testid="contact-need"
                        className="w-full bg-transparent border-0 border-b border-white/15 rounded-none px-0 py-3 h-auto text-base text-[#F5F5F5] focus:ring-0 focus:border-[#F5F5F5] data-[placeholder]:text-[#9A9A9A]/60"
                      >
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111111] border-white/10 text-[#F5F5F5]">
                        {NEEDS.map((n) => (
                          <SelectItem key={n} value={n} className="focus:bg-white/10 focus:text-[#F5F5F5]">
                            {n}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.18em] text-[#9A9A9A] mb-2">Budget Range</label>
                    <Select value={form.budget} onValueChange={(v) => setForm((f) => ({ ...f, budget: v }))}>
                      <SelectTrigger
                        data-testid="contact-budget"
                        className="w-full bg-transparent border-0 border-b border-white/15 rounded-none px-0 py-3 h-auto text-base text-[#F5F5F5] focus:ring-0 focus:border-[#F5F5F5] data-[placeholder]:text-[#9A9A9A]/60"
                      >
                        <SelectValue placeholder="Select a range" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111111] border-white/10 text-[#F5F5F5]">
                        {BUDGETS.map((b) => (
                          <SelectItem key={b} value={b} className="focus:bg-white/10 focus:text-[#F5F5F5]">
                            {b}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-[0.18em] text-[#9A9A9A] mb-2">
                      Tell me about your project
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={onChange}
                      required
                      rows={5}
                      data-testid="contact-message"
                      placeholder="What are you hoping to build, and what does success look like?"
                      className={`${fieldBase} resize-none`}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={loading}
                      data-testid="contact-submit"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-xs uppercase tracking-[0.14em] font-medium text-[#0A0A0A] transition-colors hover:bg-white/90 disabled:opacity-60"
                    >
                      {loading ? "Sending..." : "Send Project Inquiry"} <ArrowUpRight size={16} />
                    </button>
                  </div>
                </form>
              </Reveal>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
