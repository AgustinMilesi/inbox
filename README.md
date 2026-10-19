# 📥 Customer Inbox & Forms Platform

A multi-tenant SaaS platform built to collect customer inquiries through embeddable forms, triage incoming messages in a unified real-time inbox, and manage contact relationships at scale.

<p align="left">
  <a href="https://saas-am.vercel.app"><img src="https://img.shields.io/badge/Live%20Demo-saas--am.vercel.app-6366f1?style=for-the-badge&logo=vercel" alt="Live Demo" /></a>
  <a href="https://saas-am.vercel.app/demo"><img src="https://img.shields.io/badge/1--Click%20Demo%20Access-Guest%20Mode-10b981?style=for-the-badge&logo=shield" alt="1-Click Demo" /></a>
  <img src="https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.3-20232a?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-Neon-00E599?style=for-the-badge&logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma" alt="Prisma" />
</p>

---

## 🎯 What is it for?

- **Capture leads anywhere**: Create standalone form pages (`/f/:id`) or embed them into any website with a clean `<iframe>`. Features silent anti-spam protection (honeypot fields and input sanitization).
- **Centralized message triage**: A unified inbox with status filters (*New*, *Read*, *Archived*), instant keyword search, and 1-click email replies.
- **Automatic contact directory**: Every form submitter is automatically saved into a clean customer directory with full inquiry history.
- **Developer integrations**: Programmatic access with Bearer API keys and cryptographically signed webhooks (HMAC-SHA256) for real-time event streaming.

---

## ✨ Core Modules

| Module | Purpose |
|---|---|
| **Multi-Tenancy** | Strict organization data isolation with team roles (`Owner`, `Admin`, `Member`). |
| **Form Builder & Hosted Pages** | Shareable public forms and embed snippets ready for landing pages and blogs. |
| **Unified Inbox** | Real-time message triage, status updates, archiving, and quick email replies. |
| **Customer Directory** | Contact records with linked message history and external ID mapping. |
| **Developer API & Webhooks** | API key management with rate limiting and secure event delivery. |

---

## 🛠️ Tech Stack

- **Frontend & Backend**: Next.js 16 (App Router, Server Actions) + React 19
- **Language**: TypeScript (strict mode, zero `any`)
- **Styling**: Tailwind CSS 4 (dark mode and translucent surfaces)
- **Database**: PostgreSQL Serverless (Neon)
- **ORM**: Prisma ORM with connection pooling
- **Validation**: Zod + React Hook Form
- **Transactional Emails**: Resend API
- **Toasts & Feedback**: Sonner

---

## ⚡ Quick Test (No Registration Needed)

Try the full platform instantly in your browser:
- **[1-Click Demo Login](https://saas-am.vercel.app/demo)** (logs in directly with preloaded test data).
- Or visit [saas-am.vercel.app/login](https://saas-am.vercel.app/login) and click **"Entrar como Invitado (Modo Demo)"**.

---

## 🚀 Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/AgustinMilesi/inbox.git
cd inbox

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env

# 4. Generate Prisma client & start development server
npx prisma generate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 🔗 Other Projects
- [💳 Retail Engine & POS](https://github.com/AgustinMilesi/retail) — Point of sale, atomic stock control, and cash drawer audits.
- [🌐 OneCargo Logistics](https://github.com/AgustinMilesi/cargo) — International freight forwarding, customs clearance, and container tracking.
- [📬 Contact Portal](https://github.com/AgustinMilesi/contact) — Minimalist contact form and lead gateway with Zod validation.
