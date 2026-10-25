<div align="center">

# 📥 VOUT Inbox
### Managed Multi-Channel CRM, Embeddable Inbound Forms & Lead Gateway

[![VOUT Ecosystem](https://img.shields.io/badge/VOUT-Managed_Cloud-C6F827?style=for-the-badge&logoColor=black&labelColor=0A0E14)](https://github.com/AgustinMilesi)
[![SLA](https://img.shields.io/badge/SLA-99.9%25_Uptime-C6F827?style=for-the-badge&logo=shield&logoColor=black&labelColor=0A0E14)](https://saas-am.vercel.app/legal)
[![Live Demo](https://img.shields.io/badge/Live_Service-saas--am.vercel.app-C6F827?style=for-the-badge&logo=vercel&logoColor=black&labelColor=0A0E14)](https://saas-am.vercel.app)
[![1-Click Demo](https://img.shields.io/badge/1--Click_Demo-Acceso_Invitado-10b981?style=for-the-badge&logoColor=white&labelColor=0A0E14)](https://saas-am.vercel.app/demo)

<p align="center">
  <strong>Plataforma SaaS en la nube para captura y centralización de leads, mensajes de clientes y formularios web.</strong>
</p>

</div>

---

## 🎯 Modelo de Servicio Administrado (Managed SaaS)

**VOUT Inbox** se entrega como un servicio en la nube gestionado que centraliza las comunicaciones entrantes de cualquier negocio:
- 🚀 **Zero-DevOps:** Servidores cloud redundantes con disponibilidad garantizada y mantenimiento de infraestructura incluido.
- ⚡ **Formularios Embebiles:** Páginas públicas de contacto (`/f/:id`) o widgets en 1 línea `<iframe>` con trampa anti-spam silenciosa (honeypot).
- 📬 **Bandeja Central Unificada:** Clasificación de consultas en tiempo real por estado (*Nuevo*, *Leído*, *Archivado*), búsqueda instantánea y respuesta directa por email.
- 👥 **Directorio Automático de Contactos:** Cada formulario procesado alimenta automáticamente la ficha del cliente con su historial de mensajes.
- 🔐 **API & Webhooks Firmados:** Acceso seguro con claves API bearer y webhooks con firma criptográfica HMAC-SHA256 para enlazar con sistemas externos.
- 🔑 **Cuenta VOUT (VOUT ID):** Conexión transparente con el resto del ecosistema (VOUT Retail y VOUT).

---

## ⚡ Módulos Operativos

| Módulo | Ruta | Funcionalidad |
|---|---|---|
| **Bandeja Central** | `/app` | Triage de consultas entrantes, etiquetado y respuestas rápidas. |
| **Generador de Formularios** | `/app/forms` | Constructor de formularios web e integración mediante código embebible. |
| **Contactos** | `/app/contacts` | Fichero automatizado de clientes con trazabilidad de mensajes. |
| **API & Integraciones** | `/app/settings` | Emisión de API Keys y configuración de endpoints de webhooks seguros. |
| **Marco Legal & SLA** | `/legal` | Contrato de servicio administrado, SLA 99.9% y política de privacidad. |

---

## 🛠️ Stack Tecnológico

`Next.js 16` • `React 19` • `TypeScript` • `PostgreSQL Serverless (Neon)` • `Prisma ORM` • `Tailwind CSS v4` • `Zod` • `Resend API`

---

## ⚙️ Operación & Mantenimiento Interno

```bash
# Verificación de compilación y tipado
npm run typecheck

# Suite de pruebas automatizadas (validación de esquemas y honeypot)
npm test

# Sincronización de base de datos
npx prisma db push
```

---

## ⚖️ Licencia y Propiedad Intelectual

**Copyright © 2026 Agustín Milesi. Todos los derechos reservados.**

Este código fuente, arquitectura, esquemas de base de datos y diseño son **software propietario y confidencial**.
- Queda terminantemente prohibida su descarga, clonación, redistribución, sublicenciamiento o uso comercial sin autorización previa expresa por escrito.
- La [demostración pública en vivo](https://saas-am.vercel.app) se ofrece únicamente para evaluación de la experiencia de usuario.
- Consultas de licenciamiento privado o adquisición comercial: [Contacto](https://saas-am.vercel.app/contact).

---

<div align="center">
  <p>© 2026 Agustín Milesi · VOUT Inbox · Managed Cloud Communications · All Rights Reserved</p>
</div>
