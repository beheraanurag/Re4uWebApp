import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Presentations - Researchedit4u",
  description:
    "Professional presentation design and support services for conferences, seminars, and academic meetings.",
};

export default function PresentationsPage() {
  return (
    <div
      className="min-h-screen py-6 sm:py-12"
      style={{
        background:
          "radial-gradient(1100px 550px at 15% 5%, rgba(215,168,75,.18), transparent 55%), radial-gradient(900px 520px at 85% 20%, rgba(47,111,104,.14), transparent 55%), linear-gradient(180deg, var(--mist) 0%, var(--paper) 100%)",
      }}
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-[18px]">
        <div className="mb-6 sm:mb-8">
          <Badge className="mb-3 text-[10px] sm:mb-4 sm:text-xs">
            Presentations
          </Badge>
          <h1 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-4xl md:text-5xl">
            Presentations
          </h1>
          <p className="max-w-3xl text-sm text-[var(--muted-service)] sm:text-lg">
            Professional presentation design and support for conferences,
            seminars, and academic meetings.
          </p>
        </div>
        <Card className="rounded-[18px] border border-[var(--line)] bg-[rgba(255,255,255,.72)] p-5 shadow-[0_10px_24px_rgba(20,35,45,.10)] sm:rounded-[22px] sm:p-8">
          <h2 className="mb-3 text-xl font-semibold sm:mb-4 sm:text-2xl">
            What we offer
          </h2>
          <ul className="mb-4 space-y-2 text-sm text-[var(--muted-service)] sm:mb-6 sm:space-y-3 sm:text-base">
            <li>• Graphical abstracts</li>
            <li>• Slide deck design</li>
            <li>• Poster design</li>
            <li>• Conference presentation support</li>
            <li>• Visual storytelling</li>
          </ul>
          <Button
            asChild
            className="w-full rounded-full bg-gradient-to-br from-[rgba(47,111,104,1)] to-[rgba(76,139,132,1)] text-white sm:w-auto"
          >
            <Link href="/contact">Get quote</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}
