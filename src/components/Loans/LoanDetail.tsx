import Link from "next/link";
import type { Prisma } from "@/generated/prisma";

type LoanWithRelations = Prisma.LoanGetPayload<{
  include: { status: true; lender: true };
}>;

interface LoanDetailProps {
  loan: LoanWithRelations;
}

export default function LoanDetail({ loan }: LoanDetailProps) {
  return (
    <div
      className="max-w-xl mx-auto bg-card rounded-lg shadow p-8 mt-8"
      role="region"
      aria-label="Loan Details"
    >
      <h1 className="text-2xl font-bold mb-6 text-primary">Loan Details</h1>
      <div className="space-y-4">
        <div>
          <span className="font-medium">ID:</span> {loan.id}
        </div>
        <div>
          <span className="font-medium">Amount:</span> ${loan.amount.toFixed(2)}
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
        <Link
          href="/loans"
          className="text-muted-foreground hover:underline"
          aria-label="Back to Loans"
        >
          Back to Loans
        </Link>
        <Link href={`/loans/${loan.id}/edit`} aria-label="Edit Loan">
          <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
}
