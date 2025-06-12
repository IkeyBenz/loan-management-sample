import { RootLayout } from "@/components/layout/root-layout";

export default function Home() {
  return (
    <RootLayout>
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to Loan Management</h1>
        <p className="text-lg text-muted-foreground">
          Manage your loans efficiently and effectively
        </p>
      </div>
    </RootLayout>
  );
}
