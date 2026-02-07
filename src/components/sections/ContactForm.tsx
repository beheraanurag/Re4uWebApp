"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { API_BASE } from "@/lib/api";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !message) {
      addToast({
        title: "Check your details",
        description: "Please complete all fields correctly.",
      });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      addToast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      addToast({
        title: "Request received",
        description: "We will respond within 1-2 business days.",
      });
      event.currentTarget.reset();
    } catch {
      addToast({
        title: "Submission failed",
        description: "Please try again in a moment.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="Dr. Jane Doe" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="jane@university.edu"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">Project details</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your manuscript, timeline, and target journal."
          required
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit request"}
      </Button>
    </form>
  );
}
