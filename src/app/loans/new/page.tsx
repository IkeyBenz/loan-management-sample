import { RootLayout } from "@/components/layout/root-layout";
import { Database } from "@/lib/data";
import NewLoanForm from "./NewLoanForm";

export default async function NewLoanPage() {
  // Fetch status and lender options from the database
  const statuses = await Database.status.findMany({ orderBy: { name: "asc" } });
  const lenders = await Database.user.findMany({ orderBy: { name: "asc" } });

  return (
    <RootLayout>
      <div className="max-w-xl mx-auto bg-card rounded-lg shadow p-8 mt-8">
        <h1 className="text-2xl font-bold mb-6 text-primary">
          Create New Loan
        </h1>
        <NewLoanForm statuses={statuses} lenders={lenders} />
      </div>
    </RootLayout>
  );
}
