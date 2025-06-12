const { PrismaClient } = require("../src/generated/prisma");

const prisma = new PrismaClient();

async function main() {
  // Seed statuses
  await Promise.all([
    prisma.status.upsert({
      where: { name: "Pending" },
      update: {},
      create: { name: "Pending" },
    }),
    prisma.status.upsert({
      where: { name: "Approved" },
      update: {},
      create: { name: "Approved" },
    }),
    prisma.status.upsert({
      where: { name: "Rejected" },
      update: {},
      create: { name: "Rejected" },
    }),
  ]);

  // Seed a demo lender
  await prisma.user.upsert({
    where: { email: "demo@lender.com" },
    update: {},
    create: {
      name: "Demo Lender",
      email: "demo@lender.com",
    },
  });

  console.log("Seeded statuses and demo lender.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 