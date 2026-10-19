# 📥 Customer Inbox & Forms Platform

Plataforma SaaS multi-inquilino para centralizar la atención al cliente y la captura de prospectos. Permite crear formularios públicos o embebibles en cualquier sitio web, gestionar mensajes en un buzón unificado en tiempo real y sincronizar contactos comerciales.

<p align="left">
  <a href="https://saas-am.vercel.app"><img src="https://img.shields.io/badge/Demo%20en%20Vivo-saas--am.vercel.app-6366f1?style=for-the-badge&logo=vercel" alt="Live Demo" /></a>
  <a href="https://saas-am.vercel.app/demo"><img src="https://img.shields.io/badge/Acceso%20Demo%201--Click-Invitado-10b981?style=for-the-badge&logo=shield" alt="1-Click Demo" /></a>
  <img src="https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.3-20232a?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-Neon-00E599?style=for-the-badge&logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma" alt="Prisma" />
</p>

---

## 🎯 ¿Para qué sirve?

- **Capturar consultas**: Creación de formularios alojados (`/f/:id`) o insertables mediante `<iframe>` con protección anti-spam integrada (campo honeypot y sanitización estricta).
- **Atención centralizada**: Bandeja de entrada con filtros de estado (*Nuevos*, *Leídos*, *Archivados*), buscador rápido de mensajes y respuestas por correo con 1 clic.
- **Gestión de contactos (Mini-CRM)**: Registro automático de cada remitente en una agenda de clientes vinculable por ID externo.
- **Integraciones programáticas**: API REST para consultar mensajes/contactos con claves Bearer y webhooks seguros firmados con HMAC-SHA256.

---

## ✨ Módulos y Funcionalidades

| Módulo | Descripción |
|---|---|
| **Multi-Tenancy** | Aislamiento estricto de datos por organización con roles (`Owner`, `Admin`, `Member`). |
| **Form Builder & Hosted** | Formularios públicos listos para compartir o embeber en blogs, landing pages y tiendas. |
| **Inbox Unificado** | Triaje de mensajes en tiempo real, cambio de estados, archivado y búsqueda rápida. |
| **Directorio de Clientes** | Fichas de contacto con historial de mensajes recibidos y vinculación externa. |
| **Developer API & Webhooks** | Emisión de API Keys con rate limiting y despacho de eventos en tiempo real. |

---

## 🛠️ Stack Tecnológico

- **Frontend & Backend**: Next.js 16 (App Router, Server Actions) + React 19
- **Lenguaje**: TypeScript (tipado estricto extremo, 0% `any`)
- **Estilos**: Tailwind CSS 4 (tema oscuro/claro y efectos translúcidos)
- **Base de Datos**: PostgreSQL Serverless en Neon
- **ORM & Modelado**: Prisma ORM
- **Validación**: Zod + React Hook Form
- **Correos Transaccionales**: Resend API
- **Feedback & Notificaciones**: Sonner Toasts

---

## ⚡ Prueba Rápida (Sin Registro)

Podés probar la plataforma de inmediato con **1-Click**:
- **[Entrar como Invitado en Modo Demo](https://saas-am.vercel.app/demo)** (inicia sesión de prueba con datos cargados al instante).
- O accedé a [saas-am.vercel.app/login](https://saas-am.vercel.app/login) y tocá en **"Entrar como Invitado"**.

---

## 🚀 Instalación Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/AgustinMilesi/inbox.git
cd inbox

# 2. Instalar dependencias
npm install

# 3. Configurar entorno
cp .env.example .env

# 4. Generar Prisma y correr servidor
npx prisma generate
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

### 🔗 Otros Proyectos
- [💳 Retail Engine & POS](https://github.com/AgustinMilesi/retail) — Punto de venta, arqueo ciego de caja y control de inventario.
- [🌐 OneCargo Logistics](https://github.com/AgustinMilesi/cargo) — Sistema operativo de fletes internacionales y despacho de aduana.
- [📬 Contact Portal](https://github.com/AgustinMilesi/contact) — Portal de contacto y captura de leads con validación Zod.
