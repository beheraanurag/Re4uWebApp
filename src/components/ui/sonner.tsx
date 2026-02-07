"use client";

import { Toaster } from "sonner";

export function SonnerToaster() {
  return (
    <Toaster
      position="top-right"
      richColors
      toastOptions={{
        className: "border border-slate-200 bg-white text-slate-900 shadow-lg",
      }}
    />
  );
}
