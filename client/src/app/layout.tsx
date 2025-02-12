"use client";

import { ReduxProvider } from "@/providers/ReduxProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/common/sidebar";
import Header from "@/components/common/header";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <ReduxProvider>
            <div className="flex h-screen w-full">
              <AppSidebar />
              <div className="flex flex-1 flex-col px-6">
                <Header />
                <main className="flex-1 overflow-y-auto">{children}</main>
              </div>
            </div>
          </ReduxProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}
