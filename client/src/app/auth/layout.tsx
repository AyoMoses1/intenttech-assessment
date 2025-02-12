// app/auth/layout.tsx
"use client";

import { ReduxProvider } from "@/providers/ReduxProvider";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ReduxProvider>{children}</ReduxProvider>;
}
