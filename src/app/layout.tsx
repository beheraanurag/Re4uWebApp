import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { Providers } from "./providers";
import { SITE_APPLE_ICON_SRC, SITE_ICON_16_SRC, SITE_ICON_32_SRC, SITE_ICON_SRC } from "@/lib/branding";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const siteUrl = process.env.NEXTAUTH_URL || "http://62.72.56.143";
const GTM_ID = "GTM-N7CVVSCJ";

export const metadata: Metadata = {
  title: "Researchedit4u - Academic Editing and Research Support",
  description:
    "Premium academic editing, research support, and publication readiness for scholars.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Researchedit4u",
    description: "Premium academic editing and research support.",
    url: siteUrl,
    type: "website",
  },
  icons: {
    icon: [
      { url: SITE_ICON_16_SRC, type: "image/png", sizes: "16x16" },
      { url: SITE_ICON_32_SRC, type: "image/png", sizes: "32x32" },
      { url: SITE_ICON_SRC, type: "image/png", sizes: "512x512" },
    ],
    shortcut: SITE_ICON_32_SRC,
    apple: [{ url: SITE_APPLE_ICON_SRC, type: "image/png", sizes: "180x180" }],
  },
  verification: {
    google: "6Imp7-Q4GfmrYmetNUjHEUWIy9NgOlcEPQbeLbIUnMA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${inter.className}`}>
        <Script id="gtm-script" strategy="beforeInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}</Script>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
