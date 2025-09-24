"use client";

import { ReactNode } from "react";
import { ProgressProvider } from "@bprogress/next/app";

interface ProgressBarProps {
  children: ReactNode;
}

export function ProgressBar({ children }: ProgressBarProps) {
  return (
    <ProgressProvider
      height="4px"
      color="#d30000"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
}
