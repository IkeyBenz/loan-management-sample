import { getLoanById } from "@/app/actions/loans/read";
import LoanDetail from "@/components/Loans/LoanDetail";

export default async function LoanDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const loanId = Number(params.id);
  if (isNaN(loanId)) {
    return (
      <div className="text-center text-red-500 mt-12">Invalid loan ID.</div>
    );
  }
  const loan = await getLoanById(loanId);
  if (!loan) {
    return (
      <div className="text-center text-red-500 mt-12">Loan not found.</div>
    );
  }
  return <LoanDetail loan={loan} />;
}
