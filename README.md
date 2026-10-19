# 📥 Customer Inbox & Forms Platform

A modern multi-tenant platform designed to capture customer inquiries through embeddable forms, triage submissions in a unified inbox, and manage contact relationships at scale. Built to serve as the communication backbone for the retail ecosystem.

![Production Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-00E599?style=for-the-badge&logo=postgresql)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)
[![GitHub stars](https://img.shields.io/github/stars/AgustinMilesi/inbox?style=for-the-badge&logo=github&color=gold)](https://github.com/AgustinMilesi/inbox/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/AgustinMilesi/inbox?style=for-the-badge&logo=github&color=blue)](https://github.com/AgustinMilesi/inbox/network/members)

🌐 **Live Demo:** [saas-am.vercel.app](https://saas-am.vercel.app)

---

## 🎯 Architecture & Ecosystem

```
 ┌────────────────┐       ┌───────────────────────┐       ┌────────────────────────┐
 │  Public Forms  │ ────► │  Customer Inbox SaaS  │ ────► │   Retail ERP Engine    │
 │ (Web / Embed)  │       │  (Triage & Leads CRM) │       │ (POS / Stock / Orders) │
 └────────────────┘       └───────────────────────┘       └────────────────────────┘
                                    │
                         ┌──────────┴──────────┐
                         ▼                     ▼
                  REST API v1             HMAC Webhooks
```

---

## ✨ Core Capabilities

### 🏢 Multi-Tenant Workspaces
- Sign-up provisions a new organization, owner membership, and a default contact form automatically.
- Role-based permissions: `Owner`, `Admin`, and `Member`.
- Complete data isolation per workspace across all database queries.

### 📝 Embeddable & Hosted Forms
- Standalone hosted form page at `/f/:publicId`.
- Clean `<iframe>` embedding snippet for any website or blog.
- Headless API endpoint: `POST /api/public/forms/:publicId`.

### 📬 Unified Customer Inbox
- Filter by status: `New`, `Read`, and `Archived`.
- Fast search across messages, customer names, emails, and subjects.
- Quick actions: mark as read, archive, and reply directly via email.

### 👥 Customer CRM & ERP Sync
- Every form submitter is automatically registered as a contact.
- Contains an `externalId` field designed to map 1:1 with customer records in the ERP.

### 🔑 Developer REST API & Webhooks
- Secure API Key authentication (`Authorization: Bearer cs_...`).
- Cursor-based pagination for large datasets.
- Cryptographically signed HTTP Webhooks (`HMAC-SHA256`) delivered on `message.created` events.

---

## 🛠️ Tech Stack

| Component | Technology | Description |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | React Server Components & Turbopack build engine |
| **Language** | TypeScript 5 | Strict typing throughout frontend and backend |
| **Styling** | Tailwind CSS 4 | Custom dark mode palette matching the design family |
| **Database** | PostgreSQL (Neon) | Serverless Postgres with automatic branching & scaling |
| **ORM** | Prisma | Schema definitions, migrations, and typed queries |
| **Forms & Schemas** | Zod + React Hook Form | Dual-layer validation with shared schemas |
| **Emails** | Resend | Transactional emails for password resets and alerts |
| **Toasts** | Sonner | Real-time notifications and feedback |

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- **Node.js** v20.9 or higher
- A **PostgreSQL** database (a free project on [Neon.tech](https://neon.tech) works seamlessly)

### Step-by-Step Installation

```bash
# 1. Clone the repository
git clone https://github.com/AgustinMilesi/inbox.git
cd inbox

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env        # On Windows PowerShell: Copy-Item .env.example .env

# 4. Run database migrations
npx prisma migrate dev --name init

# 5. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## ⚙️ Environment Variables

| Variable | Required | Description | Example |
|---|:---:|---|---|
| `DATABASE_URL` | Yes | Neon pooled connection string (`-pooler.`) for Next.js runtime & queries | `postgresql://user:pass@ep-xyz-pooler.region.aws.neon.tech/saas?sslmode=require` |
| `DIRECT_URL` | Yes | Neon direct unpooled connection string for Prisma migrations & schema changes | `postgresql://user:pass@ep-xyz.region.aws.neon.tech/saas?sslmode=require` |
| `APP_URL` | Yes | Public application URL (used in embeds & links) | `http://localhost:3000` / `https://saas.yourdomain.com` |
| `RESEND_API_KEY` | No (Dev) | API key for transactional emails | `re_123456789` (prints to console in dev if omitted) |
| `EMAIL_FROM` | Yes | Sender address for outbound emails | `Acme Support <notifications@yourdomain.com>` |
| `APP_TIMEZONE` | No | Default timezone for formatting timestamps | `America/Argentina/Buenos_Aires` |

---

## 🛡️ Security & Reliability Architecture

- 🔐 **Password Hashing:** Passwords hashed with `scrypt` ($N=2^{15}, r=8, p=3$) and compared in constant time ($O(1)$) to prevent timing attacks.
- 🍪 **Stateless Secure Sessions:** High-entropy random tokens stored in `httpOnly`, `SameSite=Lax`, `Secure` cookies (`__Host-` prefix in production). Only the SHA-256 hash is stored in the database.
- ⏱️ **Serverless Rate Limiting:** Persistent PostgreSQL rate limits on login, registration, password resets, public forms, and the REST API.
- 📦 **Workspace Scoping:** Every database query is strictly scoped by the active session's `organizationId`.
- 🪤 **Spam Prevention:** Honeypot field, payload body size caps, and origin restrictions on public forms.
- 🔏 **Signed Webhooks:** Outbound webhooks include `X-Contact-Timestamp` and `X-Contact-Signature: sha256=<hex>` computed via `HMAC-SHA256(secret, timestamp + "." + body)`.

---

## 📡 REST API Reference

Generate API keys under **Settings → API Keys**. Include the bearer token in every request:

```http
Authorization: Bearer cs_your_api_key_here
```

Rate limit: **120 requests/min** per key.

### Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/contacts` | List contacts. Query: `limit`, `cursor`, `q`, `external_id` |
| `POST` | `/api/v1/contacts` | Create a contact. Body: `name`, `email`, `phone`, `company`, `external_id` |
| `GET` | `/api/v1/contacts/:id` | Retrieve single contact details |
| `PATCH` | `/api/v1/contacts/:id` | Update contact attributes |
| `GET` | `/api/v1/messages` | List messages. Query: `limit`, `cursor`, `status` (`new`, `read`, `archived`) |

#### Example: Query Contacts

```bash
curl -H "Authorization: Bearer cs_xxxx" \
  "https://saas.yourdomain.com/api/v1/contacts?limit=20"
```

#### Example: Verify Webhook Signature (Node.js)

```javascript
import { createHmac, timingSafeEqual } from "node:crypto";

function verifyWebhook(rawBody, timestamp, signature, secret) {
  const expected = "sha256=" + createHmac("sha256", secret).update(`${timestamp}.${rawBody}`).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b) && Math.abs(Date.now() / 1000 - Number(timestamp)) < 300;
}
```

---

## 🌐 Complete Ecosystem Suite

This platform is an integral component of a unified 4-tier commercial software suite:

| Component | Repository | Live Deployment | Role & Focus |
|---|---|---|---|
| **Retail Engine & POS** | [AgustinMilesi/retail](https://github.com/AgustinMilesi/retail) | [milesi-erp.vercel.app](https://milesi-erp.vercel.app) | Core cloud operating system, atomic inventory ledger, blind cash shifts, thermal ticket printing, and cashier POS. |
| **Customer Inbox Platform** | [AgustinMilesi/inbox](https://github.com/AgustinMilesi/inbox) | [saas-am.vercel.app](https://saas-am.vercel.app) | Multi-tenant customer inquiry inbox, embeddable contact forms, contact directory, and CRM leads bridge. *(This Repository)* |
| **OneCargo (Freight Logistics OS)** | [AgustinMilesi/cargo](https://github.com/AgustinMilesi/cargo) | [cargo-am.vercel.app](https://cargo-am.vercel.app) | International freight forwarding, container GPS milestones, customs dispatch, and rate settlements. |

### How It Connects:
1. **Unified Multi-Tenancy:** Workspaces, memberships, and users share compatible identity structures with the Retail engine.
2. **Customer Identity Bridge:** `Contact.externalId` anchors the contact directly to Retail customer accounts and debt ledgers.
3. **Event-Driven Webhooks:** The Retail engine subscribes to `message.created` HMAC-SHA256 signed webhooks to trigger sales lead and follow-up workflows.

---

## ⭐ Show Your Support

If you find this project useful or interesting, please give it a **Star** on GitHub! It helps more developers discover the ecosystem.

[![Star on GitHub](https://img.shields.io/static/v1?label=Star%20Repo&message=%E2%AD%90&color=yellow&style=for-the-badge&logo=github)](https://github.com/AgustinMilesi/inbox)

---

## 📄 License

This software is released under the [MIT License](LICENSE).

