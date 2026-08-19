# PRD — alec.studio (Freelance Web Design Portfolio)

## Original Problem Statement
Build a premium, modern, multi-page website for a freelance web design business. Must be a true multi-page site (Home, Work, Services, Process, About, Contact) with working navigation, an Awwwards-level art direction, kinetic hero, browser-window mockups of two REAL projects, honest "Design Concepts" section, and a contact/inquiry form. Dark charcoal + warm off-white + tasteful accent. No fake testimonials/stats/clients.

## Architecture
- **Frontend**: React 19 + React Router 7 (6 routes), Tailwind, framer-motion (kinetic hero, scroll reveals, page transitions), lenis (smooth scroll), react-fast-marquee. Fonts: Cabinet Grotesk (headings), Cormorant Garamond (accent italic), Manrope (body).
- **Backend**: FastAPI + MongoDB (motor). Inquiry model + endpoints under /api.
- **Design tokens**: charcoal #0D0D0F, surface #16161A, terracotta accent #D45B3E, off-white #F4F4F1.

## User Personas
- Solo young web designer ("Alec") showcasing work to win small/local-business clients.
- Small/local business owners evaluating the designer and submitting project inquiries.

## Core Requirements (static)
- 6 working pages/routes with sticky responsive nav + mobile menu + "Start a Project" CTA.
- Real projects (Alpaca Furniture, Stripes Lawn Care) in browser mockups with live-site links.
- "Design Concepts" clearly labeled, never presented as real clients. No fake data.
- Contact inquiry form persisted to DB.

## Implemented (2026-08-19)
- Home: kinetic masked-line hero, editorial marquee, credibility, Featured Work (live browser mockups via thum.io), "Why Businesses Choose Me" grid.
- Work: real project case studies (design focus chips, live-site buttons) + 4 labeled Design Concepts.
- Services: 6 numbered bento cards + "Let's Talk" CTA.
- Process: 5-step scroll-revealed timeline.
- About: manifesto, grayscale portrait area, "What I Care About".
- Contact: full inquiry form (name, business, email, phone, current website, need, budget, message) → POST /api/inquiries, sonner toasts, success panel. GET /api/inquiries for retrieval.
- Backend + frontend tested end-to-end: 100% pass, no bugs.

## Backlog
- P1: Admin view to browse submitted inquiries.
- P1: Email notification on new inquiry (Resend).
- P2: Individual case-study detail pages per project.
- P2: Replace portrait/email placeholders with real assets when provided.

## Update (2026-08-19) — Rebrand to "Naparstek Digital"
- Full monochrome visual identity matching the black business card: near-black #0A0A0A bg, white/soft-gray (#9A9A9A) type, thin borders, wide letter-spacing, geometric N monogram (SVG) used in navbar, hero badge, About profile panel, and footer. Removed terracotta accent + photo.
- About rewritten: 16-year-old high school student from Olathe, Kansas.
- Contact details: hello@naparstekdigital.com, 913.905.9935 (nav/footer/contact page).
- Email alerts: POST /api/inquiries now sends an owner notification via Emergent-managed Resend (non-blocking, guardrail gate). OWNER_EMAIL currently a.naparstek@icloud.com (from card) — change in backend/.env.
- Tested end-to-end (iteration_2): 100% backend + frontend pass, email 202 verified.

## Update (2026-08-19) — Inbox + Cleanup Pass
- Added a **private Inquiry Inbox** at `/admin` (JWT login, seeded admin from env). Read/mark-read/delete/reply per inquiry; no marketing chrome on that route. Public GET inquiries endpoint removed (admin-only now).
- Removed **Featured Work** section from Home (still on Work page).
- New **Design Concepts**: Ember & Oak, Northline Dental, Fieldhouse Remodeling, Ironside Barbell Club (real grayscale photography).
- Removed phone number site-wide; email only.
- Added **$500 – $1,000** budget tier.
- Work mockups display clean URLs (alpacafurniture.com / stripes.com) in the address bar; live links still open the real sites.
- Humanized copy across Home/Work/Contact to sound less templated.
- OWNER_EMAIL / ADMIN_EMAIL = a.naparstek@icloud.com. Tested end-to-end (iteration_3): 100% backend + frontend pass.

## Admin Credentials
- /admin — a.naparstek@icloud.com / NaparstekInbox2026! (see /app/memory/test_credentials.md)

## Update (2026-08-19) — SEO + Email
- Added per-page SEO via react-helmet-async: unique `<title>`, meta description, and canonical on Home/Work/Services/Process/About/Contact. Verified titles/descriptions/canonical swap correctly on client-side navigation (exactly one description per page).
- Social previews: Open Graph + Twitter card tags with a generated monochrome brand share image (N monogram card). Default OG/title in index.html for no-JS social scrapers.
- Added favicon.svg (N monogram), theme-color #0A0A0A, robots.txt (disallow /admin) and sitemap.xml. /admin is noindex.
- Public contact email (Contact page + footer) changed to a.naparstek@icloud.com.

## Next Tasks
- Optional: brute-force lockout on login; inbox search/status labels. Update sitemap/OG URLs to the final custom domain when live.
