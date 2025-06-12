import { RootLayout } from "@/components/layout/root-layout";

export default function LoansListPage() {
  return (
    <RootLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
        <h1 className="text-3xl font-bold text-primary">Loans</h1>
        <div className="w-full max-w-3xl bg-card rounded-lg shadow p-6">
          {/* Placeholder for loan table */}
          <div className="text-muted-foreground text-center py-8">
            Loan list will appear here.
          </div>
          <div className="flex justify-end mt-4">
            <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
              Add New Loan
            </button>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}
