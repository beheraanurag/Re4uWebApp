import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { Providers } from "./providers";
import { SITE_APPLE_ICON_SRC, SITE_ICON_16_SRC, SITE_ICON_32_SRC, SITE_ICON_SRC } from "@/lib/branding";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const siteUrl = process.env.NEXTAUTH_URL || "http://62.72.56.143";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${inter.className}`}>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
