import { Database } from "@/lib/data";
import { RootLayout } from "@/components/layout/root-layout";
import Link from "next/link";

export default async function LoanDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const loanId = Number(params.id);
  if (isNaN(loanId)) {
    return (
      <RootLayout>
        <div className="text-center text-red-500 mt-12">Invalid loan ID.</div>
      </RootLayout>
    );
  }
  const loan = await Database.loan.findUnique({
    where: { id: loanId },
    include: {
      status: true,
      lender: true,
    },
  });
  if (!loan) {
    return (
      <RootLayout>
        <div className="text-center text-red-500 mt-12">Loan not found.</div>
      </RootLayout>
    );
  }
  return (
    <RootLayout>
      <div className="max-w-xl mx-auto bg-card rounded-lg shadow p-8 mt-8">
        <h1 className="text-2xl font-bold mb-6 text-primary">Loan Details</h1>
        <div className="space-y-4">
          <div>
            <span className="font-medium">ID:</span> {loan.id}
          </div>
          <div>
            <span className="font-medium">Amount:</span> $
            {loan.amount.toFixed(2)}
          </div>
          <div>
            <span className="font-medium">Interest Rate:</span>{" "}
            {loan.interestRate}%
          </div>
          <div>
            <span className="font-medium">Term:</span> {loan.term} months
          </div>
          <div>
            <span className="font-medium">Status:</span>{" "}
            {loan.status?.name ?? "-"}
          </div>
          <div>
            <span className="font-medium">Borrower:</span> {loan.borrower}
          </div>
          <div>
            <span className="font-medium">Lender:</span>{" "}
            {loan.lender?.name ?? "-"}
          </div>
          <div>
            <span className="font-medium">Created At:</span>{" "}
            {new Date(loan.createdAt).toLocaleString()}
          </div>
          <div>
            <span className="font-medium">Updated At:</span>{" "}
            {new Date(loan.updatedAt).toLocaleString()}
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <Link href="/loans" className="text-muted-foreground hover:underline">
            Back to Loans
          </Link>
        </div>
      </div>
    </RootLayout>
  );
}
