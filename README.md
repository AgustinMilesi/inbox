<div align="center">

# 📥 VOUT Inbox
### Multi-Tenant Feedback Gateway & Embeddable Customer Inbound Platform

[![VOUT Ecosystem](https://img.shields.io/badge/VOUT-Ecosystem-C6F827?style=for-the-badge&logoColor=black&labelColor=0A0E14)](https://github.com/AgustinMilesi)
[![VOUT ID](https://img.shields.io/badge/VOUT_ID-Unified_Pass-C6F827?style=for-the-badge&logo=shield&logoColor=black&labelColor=0A0E14)](https://saas-am.vercel.app/login)
[![Live Demo](https://img.shields.io/badge/Live_Demo-saas--am.vercel.app-C6F827?style=for-the-badge&logo=vercel&logoColor=black&labelColor=0A0E14)](https://saas-am.vercel.app)
[![1-Click Demo](https://img.shields.io/badge/1--Click_Demo-Guest_Access-10b981?style=for-the-badge&logoColor=white&labelColor=0A0E14)](https://saas-am.vercel.app/demo)

</div>

---

## 🎯 Overview

**VOUT Inbox** is a multi-tenant SaaS platform built to collect customer inquiries and visitor feedback through embeddable widgets, triage messages in a unified real-time inbox, and stream webhooks to external services.
- ⚡ **Embeddable Forms:** Shareable hosted forms (`/f/:id`) or 1-line `<iframe>` snippets with silent honeypot anti-spam protection.
- 📬 **Unified Inbox:** Real-time triage with status filtering (*New*, *Read*, *Archived*), keyword search, and 1-click email replies.
- 👥 **Auto Customer Directory:** Form submissions automatically aggregate into clean customer records with historical logs.
- 🔐 **Developer API & Webhooks:** Bearer API key access with rate limiting and cryptographically signed HMAC-SHA256 webhooks.
- 🔑 **Cuenta VOUT (VOUT ID):** Unified authentication linking directly with VOUT Pocket, VOUT Retail, and VOUT Cargo.

---

## ⚡ Core Modules

| Module | Route | Capabilities |
|---|---|---|
| **Unified Inbox** | `/app` | Real-time message triage, status updates, archiving, and quick email replies. |
| **Form Builder** | `/app/forms` | Public forms and embeddable snippet generator ready for any website. |
| **Contacts** | `/app/contacts` | Auto-generated customer directory with linked message history. |
| **Developer API** | `/app/api-keys` | API key issuance, rate limits, and signed HMAC-SHA256 webhook subscriptions. |

---

## 🛠️ Stack

`Next.js 16` • `React 19` • `TypeScript` • `PostgreSQL Serverless (Neon)` • `Prisma ORM` • `Tailwind CSS v4` • `Zod` • `Resend API`

---

## 🚀 Quickstart

```bash
# Clone and enter directory
git clone https://github.com/AgustinMilesi/inbox.git
cd inbox

# Install dependencies & start
npm install
npx prisma generate
npm run dev
```

---

### ⚡ The VOUT Software Ecosystem
- [📱 VOUT Pocket](https://github.com/AgustinMilesi/expenses) — Mobile cost, subscription & micro-spending tracker.
- [💳 VOUT Retail](https://github.com/AgustinMilesi/retail) — Cloud point of sale, atomic stock control, and cash drawer audits.
- [🚢 VOUT Cargo](https://github.com/AgustinMilesi/cargo) — Freight forwarding & customs tracking operating system.
- [📬 VOUT Connect](https://github.com/AgustinMilesi/contact) — High-conversion contact portal with anti-spam protection.
