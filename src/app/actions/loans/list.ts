import { Database } from "@/lib/data";
import type { Prisma } from "@/generated/prisma";

// Infer the correct type for a loan with status included
export type LoanWithStatus = Prisma.LoanGetPayload<{ include: { status: true } }>;

export async function getLoanList(): Promise<LoanWithStatus[]> {
  return await Database.loan.findMany({
    include: {
      status: true,
    },
    orderBy: { createdAt: "desc" },
  });
}
