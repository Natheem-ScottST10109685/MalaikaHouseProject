import { PrismaClient } from "@prisma/client";
import { hash } from "argon2";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with base users...");

  await prisma.appointment.deleteMany();
  await prisma.event.deleteMany();
  await prisma.club.deleteMany();
  await prisma.child.deleteMany();
  await prisma.user.deleteMany();

  const adminPassword = await hash("Admin123!");
  const parentPassword = await hash("Parent123!");
  const partnerPassword = await hash("Partner123!");

  const admin = await prisma.user.create({
    data: {
      email: "admin@malaikahouse.co.za",
      passwordHash: adminPassword,
      role: "ADMIN",
      isActive: true,
    },
  });

  const parent = await prisma.user.create({
    data: {
      email: "parent@malaikahouse.co.za",
      passwordHash: parentPassword,
      role: "PARENT",
      isActive: true,
    },
  });

  const partner = await prisma.user.create({
    data: {
      email: "partner@malaikahouse.co.za",
      passwordHash: partnerPassword,
      role: "PARTNER",
      isActive: true,
    },
  });

  console.log("Seeded users successfully!");
  console.table([
    { email: admin.email, role: admin.role },
    { email: parent.email, role: parent.role },
    { email: partner.email, role: partner.role },
  ]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
