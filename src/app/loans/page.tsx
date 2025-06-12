import { getLoanList, LoanWithStatus } from "@/app/actions/loans/list";
import LoanList from "@/components/Loans/LoanList";

export default async function LoansListPage() {
  // Fetch loans from the new action
  const loans: LoanWithStatus[] = await getLoanList();
  return <LoanList loans={loans} />;
}
