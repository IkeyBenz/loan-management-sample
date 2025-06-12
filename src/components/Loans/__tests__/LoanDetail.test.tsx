import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoanDetail from "../LoanDetail";
import { useRouter } from "next/navigation";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("LoanDetail", () => {
  const mockLoan = {
    id: 1,
    amount: 1000,
    interestRate: 5,
    term: 12,
    status: { id: 1, name: "Active" },
    lender: {
      id: 1,
      name: "Bank A",
      email: "banka@example.com",
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
    borrower: "John Doe",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    statusId: 1,
    lenderId: 1,
  };

  const mockRouter = {
    back: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it("renders the loan details correctly", () => {
    render(<LoanDetail loan={mockLoan} />);

    // Check if all loan details are rendered
    expect(screen.getByText("Loan Details")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText(/1000.00/)).toBeInTheDocument();
    expect(screen.getByText(/5%/)).toBeInTheDocument();
    expect(screen.getByText(/12 months/)).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("navigates back when clicking the back button", async () => {
    render(<LoanDetail loan={mockLoan} />);

    // Click the back button (now a button, not a link)
    const backButton = screen.getByRole("button", { name: /back to loans/i });
    await userEvent.click(backButton);

    // Verify that router.back was called
    expect(mockRouter.back).toHaveBeenCalled();
  });

  it("navigates to edit page when clicking the edit button", async () => {
    render(<LoanDetail loan={mockLoan} />);

    // Click the edit button
    const editButton = screen.getByRole("link", { name: /edit/i });
    await userEvent.click(editButton);

    // Verify that the link has the correct href
    expect(editButton).toHaveAttribute("href", "/loans/1/edit");
  });
});
