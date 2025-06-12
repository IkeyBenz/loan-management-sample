"use client";
import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createLoan } from "@/app/actions/loans/create";
import { updateLoan } from "@/app/actions/loans/update";

interface Status {
  id: number;
  name: string;
}
interface Lender {
  id: number;
  name: string;
}
interface Loan {
  id: number;
  amount: number;
  interestRate: number;
  term: number;
  statusId: number;
  borrower: string;
  lenderId: number;
}

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      try {
        if (editMode && initialValues) {
          await updateLoan({
            id: initialValues.id,
            amount: parseFloat(form.amount),
            interestRate: parseFloat(form.interestRate),
            term: parseInt(form.term, 10),
            statusId: parseInt(form.statusId, 10),
            borrower: form.borrower,
            lenderId: parseInt(form.lenderId, 10),
          });
          router.push(`/loans/${initialValues.id}`);
        } else {
          await createLoan({
            amount: parseFloat(form.amount),
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
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-1 font-medium">Amount</label>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2"
          required
          min="0"
          step="0.01"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Interest Rate (%)</label>
        <input
          type="number"
          name="interestRate"
          value={form.interestRate}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2"
          required
          min="0"
          step="0.01"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Term (months)</label>
        <input
          type="number"
          name="term"
          value={form.term}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2"
          required
          min="1"
          step="1"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Status</label>
        <select
          name="statusId"
          value={form.statusId}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2"
          required
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
        <label className="block mb-1 font-medium">Borrower</label>
        <input
          type="text"
          name="borrower"
          value={form.borrower}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Lender</label>
        <select
          name="lenderId"
          value={form.lenderId}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2"
          required
        >
          <option value="">Select lender</option>
          {lenders.map((lender) => (
            <option key={lender.id} value={lender.id}>
              {lender.name}
            </option>
          ))}
        </select>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex justify-end items-center mt-6">
        <button
          type="submit"
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          disabled={isPending}
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
