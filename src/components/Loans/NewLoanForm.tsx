"use client";
import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createLoan } from "@/app/actions/loans/create";
import { updateLoan } from "@/app/actions/loans/update";
import type { Prisma } from "@/generated/prisma";
import CurrencyInput from "react-currency-input-field";

type Status = Prisma.StatusGetPayload<Record<string, never>>;
type Lender = Prisma.UserGetPayload<Record<string, never>>;
type Loan = Prisma.LoanGetPayload<Record<string, never>>;

export default function NewLoanForm({
  statuses,
  lenders,
  initialValues,
  editMode,
}: {
  statuses: Status[];
  lenders: Lender[];
  initialValues?: Loan;
  editMode?: boolean;
}) {
  const [form, setForm] = useState({
    amount: initialValues ? initialValues.amount.toString() : "",
    interestRate: initialValues ? initialValues.interestRate.toString() : "",
    term: initialValues ? initialValues.term.toString() : "",
    statusId: initialValues ? initialValues.statusId.toString() : "",
    borrower: initialValues ? initialValues.borrower : "",
    lenderId: initialValues ? initialValues.lenderId.toString() : "",
  });
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    if (initialValues) {
      setForm({
        amount: initialValues.amount.toString(),
        interestRate: initialValues.interestRate.toString(),
        term: initialValues.term.toString(),
        statusId: initialValues.statusId.toString(),
        borrower: initialValues.borrower,
        lenderId: initialValues.lenderId.toString(),
      });
    }
  }, [initialValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setForm({ ...form, amount: raw });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      try {
        if (editMode && initialValues) {
          await updateLoan({
            id: initialValues.id,
            amount: parseFloat(form.amount || "0"),
            interestRate: parseFloat(form.interestRate),
            term: parseInt(form.term, 10),
            statusId: parseInt(form.statusId, 10),
            borrower: form.borrower,
            lenderId: parseInt(form.lenderId, 10),
          });
          router.push(`/loans/${initialValues.id}`);
        } else {
          await createLoan({
            amount: parseFloat(form.amount || "0"),
            interestRate: parseFloat(form.interestRate),
            term: parseInt(form.term, 10),
            statusId: parseInt(form.statusId, 10),
            borrower: form.borrower,
            lenderId: parseInt(form.lenderId, 10),
          });
          router.push("/loans");
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to save loan");
      }
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit} aria-label="Loan Form">
      <div>
        <label className="block mb-1 font-medium">Amount</label>
        <CurrencyInput
          id="amount"
          name="amount"
          placeholder="$0.00"
          value={form.amount}
          decimalsLimit={2}
          prefix="$"
          className="w-full rounded border px-3 py-2"
          required
          onValueChange={(value) => setForm({ ...form, amount: value ?? "" })}
          aria-label="Loan Amount"
        />
      </div>
      <div>
        <label htmlFor="interestRate" className="block mb-1 font-medium">
          Interest Rate (%)
        </label>
        <input
          id="interestRate"
          type="number"
          name="interestRate"
          value={form.interestRate}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2"
          required
          min="0"
          step="0.01"
          aria-label="Interest Rate"
        />
      </div>
      <div>
        <label htmlFor="term" className="block mb-1 font-medium">
          Term (months)
        </label>
        <input
          id="term"
          type="number"
          name="term"
          value={form.term}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2"
          required
          min="1"
          step="1"
          aria-label="Loan Term"
        />
      </div>
      <div>
        <label htmlFor="statusId" className="block mb-1 font-medium">
          Status
        </label>
        <select
          id="statusId"
          name="statusId"
          value={form.statusId}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2"
          required
          aria-label="Loan Status"
        >
          <option value="">Select status</option>
          {statuses.map((status) => (
            <option key={status.id} value={status.id}>
              {status.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="borrower" className="block mb-1 font-medium">
          Borrower
        </label>
        <input
          id="borrower"
          type="text"
          name="borrower"
          value={form.borrower}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2"
          required
          aria-label="Borrower Name"
        />
      </div>
      <div>
        <label htmlFor="lenderId" className="block mb-1 font-medium">
          Lender
        </label>
        <select
          id="lenderId"
          name="lenderId"
          value={form.lenderId}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2"
          required
          aria-label="Lender"
        >
          <option value="">Select lender</option>
          {lenders.map((lender) => (
            <option key={lender.id} value={lender.id}>
              {lender.name}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <div className="text-red-500" role="alert" aria-live="assertive">
          {error}
        </div>
      )}
      <div className="flex justify-end items-center mt-6">
        <button
          type="submit"
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          disabled={isPending}
          aria-label={
            isPending
              ? editMode
                ? "Saving..."
                : "Creating..."
              : editMode
              ? "Save Changes"
              : "Create Loan"
          }
        >
          {isPending
            ? editMode
              ? "Saving..."
              : "Creating..."
            : editMode
            ? "Save Changes"
            : "Create Loan"}
        </button>
      </div>
    </form>
  );
}
