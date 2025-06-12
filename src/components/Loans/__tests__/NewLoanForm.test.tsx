import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewLoanForm from "../NewLoanForm";
import { useRouter } from "next/navigation";
import { createLoan } from "@/app/actions/loans/create";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock the server actions
jest.mock("@/app/actions/loans/create", () => ({
  createLoan: jest.fn(),
}));

jest.mock("@/app/actions/loans/update", () => ({
  updateLoan: jest.fn(),
}));

describe("NewLoanForm", () => {
  const mockStatuses = [
    { id: 1, name: "Active" },
    { id: 2, name: "Pending" },
  ];

  const mockLenders = [
    {
      id: 1,
      name: "Bank A",
      email: "banka@example.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: "Bank B",
      email: "bankb@example.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it("renders the form with all fields", () => {
    render(<NewLoanForm statuses={mockStatuses} lenders={mockLenders} />);

    // Check if all form fields are rendered
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/interest rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/term/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/borrower/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/lender/i)).toBeInTheDocument();
  });

  it("pre-fills form fields when initialValues are provided", () => {
    const initialValues = {
      id: 1,
      amount: 1000,
      interestRate: 5,
      term: 12,
      statusId: 1,
      borrower: "John Doe",
      lenderId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    render(
      <NewLoanForm
        statuses={mockStatuses}
        lenders={mockLenders}
        initialValues={initialValues}
        editMode={true}
      />
    );

    expect(screen.getByLabelText(/amount/i)).toHaveValue(1000);
    expect(screen.getByLabelText(/interest rate/i)).toHaveValue(5);
    expect(screen.getByLabelText(/term/i)).toHaveValue(12);
    expect(screen.getByLabelText(/borrower/i)).toHaveValue("John Doe");
  });

  it("shows validation errors for required fields", async () => {
    render(<NewLoanForm statuses={mockStatuses} lenders={mockLenders} />);

    const submitButton = screen.getByRole("button", { name: /create loan/i });
    fireEvent.click(submitButton);

    // Check if required field validation messages appear
    await waitFor(() => {
      expect(screen.getByLabelText(/amount/i)).toBeInvalid();
      expect(screen.getByLabelText(/interest rate/i)).toBeInvalid();
      expect(screen.getByLabelText(/term/i)).toBeInvalid();
      expect(screen.getByLabelText(/status/i)).toBeInvalid();
      expect(screen.getByLabelText(/borrower/i)).toBeInvalid();
      expect(screen.getByLabelText(/lender/i)).toBeInvalid();
    });
  });

  it("submits the form with valid data", async () => {
    (createLoan as jest.Mock).mockResolvedValueOnce({ id: 1 });

    render(<NewLoanForm statuses={mockStatuses} lenders={mockLenders} />);

    // Fill in the form
    await userEvent.type(screen.getByLabelText(/amount/i), "1000");
    await userEvent.type(screen.getByLabelText(/interest rate/i), "5");
    await userEvent.type(screen.getByLabelText(/term/i), "12");
    await userEvent.selectOptions(screen.getByLabelText(/status/i), "1");
    await userEvent.type(screen.getByLabelText(/borrower/i), "John Doe");
    await userEvent.selectOptions(screen.getByLabelText(/lender/i), "1");

    // Submit the form
    const submitButton = screen.getByRole("button", { name: /create loan/i });
    await userEvent.click(submitButton);

    // Verify that createLoan was called with the correct data
    await waitFor(() => {
      expect(createLoan).toHaveBeenCalledWith({
        amount: 1000,
        interestRate: 5,
        term: 12,
        statusId: 1,
        borrower: "John Doe",
        lenderId: 1,
      });
    });

    // Verify that router.push was called
    expect(mockRouter.push).toHaveBeenCalledWith("/loans");
  });
});
