import { RootLayout } from "@/components/layout/root-layout";
import { Database } from "@/lib/data";
import type { Prisma } from "@/generated/prisma";
import LoanTable from "./LoanTable";

// Infer the correct type for a loan with status included
type LoanWithStatus = Prisma.LoanGetPayload<{ include: { status: true } }>;

export default async function LoansListPage() {
  // Fetch loans from the database
  const loans: LoanWithStatus[] = await Database.loan.findMany({
    include: {
      status: true,
    },
    orderBy: { createdAt: "desc" },
  });

  // Add a client-side component for row navigation
  return (
    <RootLayout>
      <LoanTable loans={loans} />
    </RootLayout>
  );
}
