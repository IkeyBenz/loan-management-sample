# Loan Management Dashboard

## Overview

This is a full-stack Loan Management Dashboard built with Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Prisma, and PostgreSQL. It demonstrates modern best practices for scalable, maintainable, and accessible web applications. The project is designed as a take-home for a founding full stack engineer position, with a focus on code quality, developer experience, and real-world usability.

*Currently Hosted on Vercel* at https://loan-management-sample.vercel.app
---

## 🚀 How to Run the Project

### 1. Clone the Repository
```sh
git clone git@github.com:IkeyBenz/loan-management-sample.git
cd loan-management-sample
```

### 2. Install Dependencies
Using Yarn (recommended):
```sh
yarn install
```
Or with npm:
```sh
npm install
```

### 3. Set Up the Database
- Ensure you have PostgreSQL running locally (or update the `.env` file for your DB connection).
- Run Prisma migrations and seed the database:
```sh
yarn prisma migrate dev
# (Optional) Seed demo data:
yarn prisma db seed
```

### 4. Start the Development Server
```sh
yarn dev
```
Visit [http://localhost:3000](http://localhost:3000) to view the app.

### 5. Run Tests
```sh
yarn test
```

---

## 📁 Folder Structure

```
├── src/
│   ├── app/                # Next.js app directory (routing, pages, server actions)
│   │   ├── actions/         # Server actions (CRUD logic, data fetching)
│   │   ├── loans/           # Loan-related pages (list, detail, edit, new)
│   │   └── ...
│   ├── components/          # Reusable React components
│   │   └── Loans/           # Loan-specific UI components (LoanList, LoanDetail, NewLoanForm)
│   ├── generated/           # (Ignored) Generated code (e.g., Prisma client)
│   ├── test/                # Test setup files
│   └── ...
├── prisma/                  # Prisma schema and seed scripts
├── public/                  # Static assets
├── styles/                  # Tailwind and global styles
├── jest.config.mjs          # Jest configuration (ESM)
├── eslint.config.mjs        # ESLint configuration (Flat config)
├── README.md                # Project documentation
└── ...
```

---

## ✨ Why This Project Stands Out

- **Modern Full Stack:** Uses the latest Next.js App Router, server actions, and React best practices.
- **Type Safety:** End-to-end TypeScript, Prisma-generated types, and strict linting.
- **UI/UX:** Responsive, accessible, and visually appealing UI with shadcn/ui and Tailwind CSS.
- **Accessibility:** WCAG-compliant forms, keyboard navigation, and ARIA attributes.
- **Testing:** Automated unit/integration tests for critical components and logic.
- **Code Quality:** Modular, clean, and well-documented codebase with clear separation of concerns.
- **Developer Experience:** Fast iteration, hot reload, and easy-to-understand structure.
- **Scalability:** Designed for easy extension (add features, new entities, etc.)
- **Real-World Patterns:** Demonstrates patterns for CRUD, server/client boundaries, and error handling.

---

## 🧑‍💻 About This Takehome

This project was built as a demonstration of my approach to building robust, maintainable, and delightful full stack applications. I focused on:
- **Clarity:** Clean code, clear structure, and helpful comments.
- **Practicality:** Realistic features and workflows (CRUD, validation, error handling).
- **Quality:** Linting, formatting, and testing are all first-class citizens.
- **Empathy:** Accessibility and user experience are not afterthoughts.

If you have any questions or want to discuss the code, I'm happy to walk through any part of it!

---

**Thank you for reviewing my takehome!**