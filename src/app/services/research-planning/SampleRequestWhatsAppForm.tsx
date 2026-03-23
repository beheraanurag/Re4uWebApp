"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { WHATSAPP_URL } from "@/lib/contact";

function openWhatsAppPrefilled(message: string) {
  const href = `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
  const opened = window.open(href, "_blank", "noopener,noreferrer");
  if (!opened) {
    window.location.href = href;
  }
}

export function SampleRequestWhatsAppForm() {
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  return (
    <form
      className={styles.sampleForm}
      onSubmit={(event) => {
        event.preventDefault();
        const formEl = event.currentTarget;
        if (!formEl.checkValidity()) {
          formEl.reportValidity();
          return;
        }

        const data = new FormData(formEl);
        const fullName = String(data.get("name") ?? "").trim();
        const email = String(data.get("email") ?? "").trim();
        const phone = String(data.get("phone") ?? "").trim();
        const level = String(data.get("level") ?? "").trim();
        const subject = String(data.get("subject") ?? "").trim();
        const requirement = String(data.get("requirement") ?? "").trim();
        const file = data.get("formatfile");
        const fileName =
          file && typeof file === "object" && "name" in file
            ? String((file as File).name ?? "")
            : "";

        const message = [
          "Subject-specific sample request (Research Planning)",
          "",
          `Name: ${fullName}`,
          `Email: ${email}`,
          `Phone/WhatsApp: ${phone}`,
          "",
          `Level: ${level}`,
          `Subject/domain: ${subject}`,
          "",
          "Requirement:",
          requirement || "-",
          "",
          `Template/format file selected: ${fileName || "Not uploaded"}`,
          fileName ? "Note: WhatsApp cannot auto-attach files from a website. Please attach the file manually in WhatsApp." : "",
        ].join("\n");

        openWhatsAppPrefilled(message);
      }}
    >
      <div className={styles.field}>
        <label htmlFor="srName">Full name *</label>
        <input
          id="srName"
          name="name"
          type="text"
          required
          placeholder="Your name"
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="srEmail">Email *</label>
        <input
          id="srEmail"
          name="email"
          type="email"
          required
          placeholder="name@email.com"
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="srPhone">Phone or WhatsApp *</label>
        <input
          id="srPhone"
          name="phone"
          type="tel"
          required
          placeholder="+91..."
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="srLevel">Level *</label>
        <select id="srLevel" name="level" defaultValue="" required>
          <option value="" disabled>
            Select
          </option>
          <option>PhD / Registration</option>
          <option>Thesis / Dissertation</option>
          <option>Grant / Funding</option>
          <option>Other</option>
        </select>
      </div>
      <div className={`${styles.field} ${styles.fieldFull}`}>
        <label htmlFor="srSubject">Subject or domain *</label>
        <input
          id="srSubject"
          name="subject"
          type="text"
          required
          placeholder="e.g., Psychology, Civil Engineering, Management"
        />
      </div>
      <div className={`${styles.field} ${styles.fieldFull}`}>
        <label htmlFor="srReq">Requirement *</label>
        <textarea
          id="srReq"
          name="requirement"
          rows={4}
          required
          placeholder="What do you want to review in the sample? (gap, RQs, methodology, timeline, format)"
        />
      </div>
      <div className={`${styles.field} ${styles.fieldFull}`}>
        <label htmlFor="srFile">Upload institute or funder format (optional)</label>
        <input
          id="srFile"
          name="formatfile"
          type="file"
          accept=".pdf,.doc,.docx,.rtf,.txt"
          onChange={(event) => {
            const file = event.currentTarget.files?.[0];
            setSelectedFileName(file?.name ?? "");
          }}
        />
        <p className={styles.mutedLine}>
          If you upload your template, we can align the sample structure more
          closely to your format.
        </p>
        {selectedFileName ? (
          <p className={styles.mutedLine}>Selected file: {selectedFileName}</p>
        ) : null}
      </div>
      <div className={`${styles.field} ${styles.fieldFull}`}>
        <button
          className={`${styles.btn} ${styles.btnPrimary} ${styles.sampleSubmitBtn}`}
          type="submit"
        >
          Send me a sample preview
        </button>
        <p className={styles.mutedLine}>
          By submitting, you agree we may contact you to share the preview.
        </p>
      </div>
    </form>
  );
}
