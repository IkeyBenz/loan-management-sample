import { getLoanList, LoanWithStatus } from "@/app/actions/loans/list";
import LoanList from "@/components/Loans/LoanList";

// Ensure we're always fetching fresh data when rendering this page.
// Prevent Next.js from statically rendering at build time.
export const dynamic = "force-dynamic";

export default async function LoansListPage() {
  // Fetch loans from the new action
  const loans: LoanWithStatus[] = await getLoanList();
  return <LoanList loans={loans} />;
}
