import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Modern Next.js 16 Dashboard",
  description: "Production-ready reference for the latest Next.js patterns",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 min-h-screen selection:bg-blue-100 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}
