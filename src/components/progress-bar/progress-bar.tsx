"use client";

import { ReactNode } from "react";
import { ProgressProvider } from "@bprogress/next/app";
import ClientOnly from "@/components/client-only";

interface ProgressBarProps {
  children: ReactNode;
}

export function ProgressBar({ children }: ProgressBarProps) {
  return (
    <ClientOnly>
      <ProgressProvider
        height="4px"
        color="#d30000"
        options={{ showSpinner: false }}
        shallowRouting
      >
        {children}
      </ProgressProvider>
    </ClientOnly>
  );
}
