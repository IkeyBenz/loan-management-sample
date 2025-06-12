import { Database } from "@/lib/data";

export async function getLoanById(loanId: number) {
  return Database.loan.findUnique({
    where: { id: loanId },
    include: {
      status: true,
      lender: true,
    },
  });
}
