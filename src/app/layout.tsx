import React, { Suspense } from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaskFlow | Dashboard",
  description: "Task management and status dashboard built with Next.js 16.",
};

export default function RootLayout({
  children,
  modal, // Parallel route slot used for rendering modals without losing underlying context.
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 min-h-screen selection:bg-blue-100 selection:text-blue-900">
        <div className="flex min-h-screen overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <Suspense fallback={null}>
              {children}
            </Suspense>
          </div>
        </div>
        <Suspense fallback={null}>
          {modal}
        </Suspense>
      </body>
    </html>
  );
}
