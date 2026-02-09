import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Researchedit4u - Academic Editing and Research Support",
  description:
    "Premium academic editing, research support, and publication readiness for scholars.",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "Researchedit4u",
    description: "Premium academic editing and research support.",
    url: "http://localhost:3000",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
