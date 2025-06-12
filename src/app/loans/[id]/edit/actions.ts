"use server";
import { Database } from "@/lib/data";

interface UpdateLoanInput {
  id: number;
  amount: number;
  interestRate: number;
  term: number;
  statusId: number;
  borrower: string;
  lenderId: number;
}

export async function updateLoan(input: UpdateLoanInput) {
  if (
    !input.id ||
    !input.amount ||
    !input.interestRate ||
    !input.term ||
    !input.statusId ||
    !input.borrower ||
    !input.lenderId
  ) {
    throw new Error("All fields are required");
  }
  if (input.amount <= 0) throw new Error("Amount must be positive");
  if (input.interestRate < 0) throw new Error("Interest rate must be non-negative");
  if (input.term <= 0) throw new Error("Term must be positive");

  const loan = await Database.loan.update({
    where: { id: input.id },
    data: {
      amount: input.amount,
      interestRate: input.interestRate,
      term: input.term,
      statusId: input.statusId,
      borrower: input.borrower,
      lenderId: input.lenderId,
    },
  });
  return loan;
} 