import type { Metadata } from "next";
import "./globals.css";
import RootLayout from "@/components/layout/RootLayout";

export const metadata: Metadata = {
  title: "Loan Management Dashboard",
  description: "A modern loan management application built with Next.js",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
