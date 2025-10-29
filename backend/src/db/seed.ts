import { PrismaClient } from "@prisma/client";
import { hash } from "argon2";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.user.deleteMany();

  const adminPassword = await hash("Admin123!");
  const parentPassword = await hash("Parent123!");
  const staffPassword = await hash("Staff123!");
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

  const staff = await prisma.user.create({
    data: {
      email: "staff@malaikahouse.co.za",
      passwordHash: staffPassword,
      role: "STAFF",
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

  console.log("✅ Seed data created successfully!");
  console.table([admin, parent, staff, partner].map(u => ({
    id: u.id,
    email: u.email,
    role: u.role,
  })));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
