import { getStatusList } from "@/app/actions/statuses/list";
import { getUsersList } from "@/app/actions/users/list";
import NewLoanForm from "../../new/NewLoanForm";
import { notFound } from "next/navigation";
import { Database } from "@/lib/data";

export default async function EditLoanPage({
  params,
}: {
  params: { id: string };
}) {
  const loanId = Number(params.id);
  if (isNaN(loanId)) return notFound();

  const loan = await Database.loan.findUnique({
    where: { id: loanId },
  });
  if (!loan) return notFound();

  const statuses = await getStatusList();
  const lenders = await getUsersList();

  return (
    <div className="max-w-xl mx-auto bg-card rounded-lg shadow p-8 mt-8">
      <h1 className="text-2xl font-bold mb-6 text-primary">Edit Loan</h1>
      <NewLoanForm
        statuses={statuses}
        lenders={lenders}
        initialValues={loan}
        editMode={true}
      />
    </div>
  );
}
