// app/layout.tsx

"use client";

import { ReduxProvider } from "@/providers/ReduxProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        Test Target
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
