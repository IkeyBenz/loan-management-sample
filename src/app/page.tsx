import { RootLayout } from "@/components/layout/root-layout";

export default function Home() {
  return (
    <RootLayout>
      <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4 bg-background p-8">
        <h1 className="text-4xl font-bold text-primary">
          Welcome to Loan Management
        </h1>
        <p className="text-lg text-muted-foreground">
          Manage your loans efficiently and effectively
        </p>
        <div className="mt-8 flex gap-4">
          <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
            Get Started
          </button>
          <button className="rounded-md border border-input bg-background px-4 py-2 hover:bg-accent hover:text-accent-foreground">
            Learn More
          </button>
        </div>
      </div>
    </RootLayout>
  );
}
