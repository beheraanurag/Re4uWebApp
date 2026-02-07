"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowUp } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setShowToast(true);
      setEmail("");
      setTimeout(() => setShowToast(false), 2200);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="mx-auto mb-8 my-4 max-w-[1180px] px-4 sm:my-6 sm:mb-14 sm:px-5">
      <footer
        className="overflow-hidden rounded-[20px] border border-[rgba(215,223,236,0.95)] bg-gradient-to-b from-[rgba(255,255,255,0.92)] to-[rgba(238,243,251,0.62)] shadow-[0_16px_44px_rgba(20,35,45,0.14)] sm:rounded-[26px]"
        aria-label="Footer"
      >
        <div
          id="newsletter"
          className="grid grid-cols-1 items-center gap-3 border-b border-[rgba(215,223,236,0.95)] bg-[radial-gradient(700px_240px_at_15%_-40%,rgba(14,165,164,0.16),transparent_60%),radial-gradient(700px_240px_at_85%_-40%,rgba(11,58,117,0.16),transparent_60%),rgba(238,243,251,0.85)] p-4 sm:grid-cols-[1.2fr_1fr] sm:gap-[14px] sm:p-[18px] max-md:grid-cols-1"
        >
          <div>
            <h3 className="m-0 text-base sm:text-lg">Share what you&apos;re working on - get next-step options in 1 working day.</h3>
            <p className="mt-1.5 mb-0 text-xs leading-[1.5] text-[#6b7280] sm:text-sm">
              Get practical resources on rejection, journal choice, and peer review. No spam.
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="flex flex-wrap justify-end gap-2 sm:gap-2.5 max-md:justify-start">
              <label htmlFor="footer-email" className="sr-only">Email for updates and resources</label>
              <div className="flex w-full min-w-0 flex-[1_1_280px] items-center gap-2 rounded-full border border-[rgba(215,223,236,0.95)] bg-[rgba(255,255,255,0.92)] px-2.5 py-2 sm:gap-2.5 sm:px-3 sm:py-2.5 max-md:min-w-0 max-md:w-full">
                <Mail className="h-4 w-4 flex-shrink-0 text-[#0b3a75] sm:h-[18px] sm:w-[18px]" aria-hidden />
                <Input
                  id="footer-email"
                  name="email"
                  type="email"
                  placeholder="Email for updates & resources"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-0 bg-transparent text-xs text-[#111827] outline-none sm:text-sm"
                />
              </div>
              <Button
                type="submit"
                className="w-full rounded-lg bg-[#1d4ed8] px-3 py-2 text-xs font-semibold text-[#f9fafb] shadow-[0_10px_24px_rgba(37,99,235,0.35)] hover:shadow-[0_14px_32px_rgba(37,99,235,0.45)] sm:w-auto sm:px-4 sm:py-2.5 sm:text-sm whitespace-nowrap"
              >
                Notify me
              </Button>
              <div className="w-full pr-1.5 text-right text-[10px] text-[#6b7280] max-md:text-left sm:text-xs">
                Unsubscribe anytime · Privacy-respectful
              </div>
              {showToast && (
                <div className="mt-2 w-full text-[11px] font-extrabold text-[#0b5] sm:text-[13px]">
                  Thanks - you&apos;re subscribed.
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 p-4 pb-3 max-[520px]:grid-cols-1 max-md:grid-cols-2 sm:gap-[14px] sm:p-[18px] md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <h4 className="mb-2.5 m-0 text-[13px] uppercase tracking-[0.1em] text-[#6b7280]">About / Trust</h4>
            <p className="m-0 text-sm leading-[1.6] text-[#6b7280]">
              Specialised academic support for researchers, universities, and R&D teams - with ethics-first editorial and publication strategy.
            </p>
            <div className="mt-2.5 flex flex-col gap-2">
              <Link href="#ethical-policy" className="text-sm font-bold text-[#111827] no-underline opacity-90 hover:opacity-100 hover:underline">
                Ethical support policy
              </Link>
              <Link href="#confidentiality-policy" className="text-sm font-bold text-[#111827] no-underline opacity-90 hover:opacity-100 hover:underline">
                Confidentiality
              </Link>
              <Link href="#no-ghostwriting" className="text-sm font-bold text-[#111827] no-underline opacity-90 hover:opacity-100 hover:underline">
                No-ghostwriting policy
              </Link>
            </div>
          </div>
          <div>
            <h4 className="mb-2.5 m-0 text-[13px] uppercase tracking-[0.1em] text-[#6b7280]">Services</h4>
            <div className="mt-2.5 flex flex-col gap-2">
              <Link href="/services" className="text-sm font-bold text-[#111827] no-underline opacity-90 hover:opacity-100 hover:underline">
                Editorial Support
              </Link>
              <Link href="/services" className="text-sm font-bold text-[#111827] no-underline opacity-90 hover:opacity-100 hover:underline">
                Data & Statistics
              </Link>
              <Link href="/services" className="text-sm font-bold text-[#111827] no-underline opacity-90 hover:opacity-100 hover:underline">
                Journal Selection & Submission
              </Link>
              <Link href="/services" className="text-sm font-bold text-[#111827] no-underline opacity-90 hover:opacity-100 hover:underline">
                Quick Offers
              </Link>
            </div>
          </div>
          <div>
            <h4 className="mb-2.5 m-0 text-[13px] uppercase tracking-[0.1em] text-[#6b7280]">Resources (RE Minds)</h4>
            <div className="mt-2.5 flex flex-col gap-2">
              <Link href="/blog" className="text-sm font-bold text-[#111827] no-underline opacity-90 hover:opacity-100 hover:underline">
                Desk rejection series
              </Link>
              <Link href="/blog" className="text-sm font-bold text-[#111827] no-underline opacity-90 hover:opacity-100 hover:underline">
                Journal selection guide
              </Link>
              <Link href="/blog" className="text-sm font-bold text-[#111827] no-underline opacity-90 hover:opacity-100 hover:underline">
                AI & similarity explained
              </Link>
            </div>
          </div>
          <div>
            <h4 className="mb-2.5 m-0 text-[13px] uppercase tracking-[0.1em] text-[#6b7280]">Contact</h4>
            <div className="mt-2.5 flex flex-col gap-2">
              <Link href="mailto:support@researchedit4u.in" className="text-sm font-bold text-[#111827] no-underline opacity-90 hover:opacity-100 hover:underline">
                support@researchedit4u.in
              </Link>
              <Link href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#111827] no-underline opacity-90 hover:opacity-100 hover:underline">
                WhatsApp (quick response)
              </Link>
              <Link href="#hours" className="text-sm font-bold text-[#111827] no-underline opacity-90 hover:opacity-100 hover:underline">
                Hours: Mon-Sat
              </Link>
              <Link href="/contact" className="text-sm font-bold text-[#1d4ed8] no-underline opacity-90 hover:opacity-100 hover:underline">
                Book 1:1 Expert Call
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-[rgba(215,223,236,0.95)] bg-[rgba(255,255,255,0.75)] px-[18px] py-3 text-[13px] text-[#6b7280]">
          <div>© {currentYear} ResearchEdit4U</div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="#terms" className="font-extrabold text-[#6b7280] no-underline hover:underline">Terms</Link>
            <Link href="#privacy" className="font-extrabold text-[#6b7280] no-underline hover:underline">Privacy</Link>
            <Link href="#cookies" className="font-extrabold text-[#6b7280] no-underline hover:underline">Cookies</Link>
          </div>
          <div className="ml-auto max-md:ml-0">
            <Link
              href="#top"
              aria-label="Back to top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(215,223,236,0.95)] bg-[rgba(255,255,255,0.9)] px-2.5 py-2 font-extrabold text-[#111827] no-underline transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(11,27,51,0.08)]"
            >
              Back to top
              <ArrowUp className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
