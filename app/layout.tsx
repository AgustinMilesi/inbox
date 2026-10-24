import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { PreferencesProvider } from "@/components/PreferencesProvider";
import { CookieBanner } from "@/components/CookieBanner";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://saas-am.vercel.app"),
  title: { default: "VOUT Inbox · Multi-Tenant Customer Feedback & Inbound CRM", template: "%s · VOUT Inbox" },
  description:
    "Multi-tenant customer feedback platform. Embeddable web forms, strict organization data isolation, signed HMAC-SHA256 webhooks, and REST API v1.",
  applicationName: "VOUT Inbox",
  keywords: [
    "Customer Feedback",
    "CRM",
    "Inbound Forms",
    "Multi-tenant SaaS",
    "Webhooks",
    "Next.js",
    "Prisma",
    "Agustín Milesi",
  ],
  authors: [{ name: "Agustín Milesi", url: "https://github.com/AgustinMilesi" }],
  creator: "Agustín Milesi",
  publisher: "VOUT Ecosystem",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "VOUT Inbox · Multi-Tenant Feedback Platform",
    description:
      "Collect customer inquiries through embeddable forms, triage in real-time, and relay events with HMAC-SHA256 signed webhooks.",
    url: "https://saas-am.vercel.app",
    siteName: "VOUT Inbox",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VOUT Inbox · Multi-Tenant Customer Feedback Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VOUT Inbox · Multi-Tenant Customer Feedback Platform",
    description: "Centralize customer inquiries and webhook events in a real-time inbox.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "VOUT Inbox",
  operatingSystem: "Web",
  applicationCategory: "CommunicationApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Person",
    name: "Agustín Milesi",
    url: "https://github.com/AgustinMilesi",
  },
  description:
    "Multi-tenant customer feedback platform with embeddable forms, HMAC-SHA256 webhooks, and real-time unified inbox.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0A0E14] text-white selection:bg-[var(--primary-accent)] selection:text-[var(--primary-accent-text)] transition-colors duration-200">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PreferencesProvider>
          {children}
          <CookieBanner />
          <Toaster position="top-right" richColors />
        </PreferencesProvider>
      </body>
    </html>
  );
}
