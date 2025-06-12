import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoanList from "../LoanList";
import { useRouter } from "next/navigation";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("LoanList", () => {
  const mockLoans = [
    {
      id: 1,
      amount: 1000,
      interestRate: 5,
      term: 12,
      status: { id: 1, name: "Active" },
      borrower: "John Doe",
      createdAt: new Date(),
      updatedAt: new Date(),
      statusId: 1,
      lenderId: 1,
    },
    {
      id: 2,
      amount: 2000,
      interestRate: 6,
      term: 24,
      status: { id: 2, name: "Pending" },
      borrower: "Jane Smith",
      createdAt: new Date(),
      updatedAt: new Date(),
      statusId: 2,
      lenderId: 2,
    },
  ];

  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it("renders the loan list with all loans", () => {
    render(<LoanList loans={mockLoans} />);

    // Check if the title is rendered
    expect(screen.getByText("Loans")).toBeInTheDocument();

    // Check if all loans are rendered
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText(/1000.00/)).toBeInTheDocument();
    expect(screen.getByText(/2000.00/)).toBeInTheDocument();
  });

  it('shows "No loans found" when the list is empty', () => {
    render(<LoanList loans={[]} />);
    expect(screen.getByText("No loans found.")).toBeInTheDocument();
  });

  it("navigates to loan detail page when clicking a loan row", async () => {
    render(<LoanList loans={mockLoans} />);

    // Click on the first loan row
    const firstLoanRow = screen.getByText("John Doe").closest("tr");
    if (firstLoanRow) {
      await userEvent.click(firstLoanRow);
    }

    // Verify that router.push was called with the correct path
    expect(mockRouter.push).toHaveBeenCalledWith("/loans/1");
  });

  it("navigates to new loan page when clicking the Add New Loan button", async () => {
    render(<LoanList loans={mockLoans} />);

    // Click the Add New Loan button
    const addButton = screen.getByRole("link", { name: /add new loan/i });
    await userEvent.click(addButton);

    // Verify that the link has the correct href
    expect(addButton).toHaveAttribute("href", "/loans/new");
  });
});
