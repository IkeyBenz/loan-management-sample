"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoanTable({ loans }: { loans: any[] }) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
      <h1 className="text-3xl font-bold text-primary">Loans</h1>
      <div className="w-full max-w-3xl bg-card rounded-lg shadow p-6">
        {loans.length === 0 ? (
          <div className="text-muted-foreground text-center py-8">
            No loans found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Interest Rate</th>
                  <th className="px-4 py-2">Term</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Borrower</th>
                  <th className="px-4 py-2">Created At</th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan) => (
                  <tr
                    key={loan.id}
                    className="border-b hover:bg-muted/50 cursor-pointer"
                    onClick={() => router.push(`/loans/${loan.id}`)}
                  >
                    <td className="px-4 py-2">{loan.id}</td>
                    <td className="px-4 py-2">${loan.amount.toFixed(2)}</td>
                    <td className="px-4 py-2">{loan.interestRate}%</td>
                    <td className="px-4 py-2">{loan.term} mo</td>
                    <td className="px-4 py-2">{loan.status?.name ?? "-"}</td>
                    <td className="px-4 py-2">{loan.borrower}</td>
                    <td className="px-4 py-2">
                      {new Date(loan.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="flex justify-end mt-4">
          <Link href="/loans/new">
            <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
              Add New Loan
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
