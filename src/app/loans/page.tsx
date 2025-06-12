import { getLoanList, LoanWithStatus } from "@/app/actions/loans/list";
import LoanTable from "./LoanTable";

export default async function LoansListPage() {
  // Fetch loans from the new action
  const loans: LoanWithStatus[] = await getLoanList();
  return <LoanTable loans={loans} />;
}
