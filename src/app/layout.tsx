import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loan Management Dashboard",
  description: "A modern loan management application built with Next.js",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
