"use client";

import { useToast } from "./use-toast";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  ToastViewport,
} from "./toast";
import * as ToastPrimitives from "@radix-ui/react-toast";

export function Toaster() {
  return (
    <ToastPrimitives.Provider>
      <ToastViewport className="fixed right-4 top-4 z-50 flex w-80 flex-col gap-2" />
      <ToastRenderer />
    </ToastPrimitives.Provider>
  );
}

function ToastRenderer() {
  const { toasts, removeToast } = useToast();
  return (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          onOpenChange={(open) => !open && removeToast(toast.id)}
          open
        >
          <div>
            <ToastTitle>{toast.title}</ToastTitle>
            {toast.description ? (
              <ToastDescription>{toast.description}</ToastDescription>
            ) : null}
          </div>
        </Toast>
      ))}
    </>
  );
}
