"use client";
import { useState } from "react";
import { RootLayout } from "@/components/layout/root-layout";
import Link from "next/link";

export default function NewLoanPage() {
  // Placeholder for form state
  const [form, setForm] = useState({
    amount: "",
    interestRate: "",
    term: "",
    statusId: "",
    borrower: "",
    lenderId: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Placeholder for status and lender options (to be fetched from server in a real app)
  const statusOptions = [
    { id: 1, name: "Pending" },
    { id: 2, name: "Approved" },
    { id: 3, name: "Rejected" },
  ];
  const lenderOptions = [{ id: 1, name: "Demo Lender" }];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // TODO: Call server action to create loan
    setTimeout(() => {
      setLoading(false);
      alert("Loan created! (Server action not yet implemented)");
    }, 1000);
  };

  return (
    <RootLayout>
      <div className="max-w-xl mx-auto bg-card rounded-lg shadow p-8 mt-8">
        <h1 className="text-2xl font-bold mb-6 text-primary">
          Create New Loan
        </h1>
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
              {statusOptions.map((status) => (
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
              {lenderOptions.map((lender) => (
                <option key={lender.id} value={lender.id}>
                  {lender.name}
                </option>
              ))}
            </select>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <div className="flex justify-between items-center mt-6">
            <Link
              href="/loans"
              className="text-muted-foreground hover:underline"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Loan"}
            </button>
          </div>
        </form>
      </div>
    </RootLayout>
  );
}
