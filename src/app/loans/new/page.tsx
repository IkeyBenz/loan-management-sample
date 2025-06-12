import { getStatusList } from "@/app/actions/statuses/list";
import { getUsersList } from "@/app/actions/users/list";
import NewLoanForm from "./NewLoanForm";

export default async function NewLoanPage() {
  // Fetch status and lender options using the new actions
  const statuses = await getStatusList();
  const lenders = await getUsersList();

  return (
    <div className="max-w-xl mx-auto bg-card rounded-lg shadow p-8 mt-8">
      <h1 className="text-2xl font-bold mb-6 text-primary">Create New Loan</h1>
      <NewLoanForm statuses={statuses} lenders={lenders} />
    </div>
  );
}
