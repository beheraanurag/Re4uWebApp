import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact - Researchedit4u",
  description: "Start an editing engagement or ask a question.",
};

export default function ContactPage() {
  return (
    <section className="py-16 md:py-20">
      <div className="container grid gap-8 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        <div>
          <h1 className="text-4xl font-semibold text-slate-900">Contact</h1>
          <p className="mt-3 text-slate-600">
            Tell us about your manuscript, timeline, and target journal. We will
            respond within two business days.
          </p>
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
            Prefer email? Write to hello@researchedit4u.com
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
