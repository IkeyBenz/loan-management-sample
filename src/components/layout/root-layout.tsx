import { ReactNode } from "react";
import Link from "next/link";

interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link className="font-bold text-lg" href="/">
            Loan Management
          </Link>
        </div>
      </header>
      <main className="container py-6">{children}</main>
    </div>
  );
}
