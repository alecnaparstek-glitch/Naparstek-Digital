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

## Next Tasks
- Await user's real photo + contact email to replace placeholders.
