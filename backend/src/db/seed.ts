import { prisma } from './index.js';
import argon2 from 'argon2';

// Admin user
async function main() {
  const adminEmail = 'admin@example.com';
  const admin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!admin) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash: await argon2.hash('Admin@123', { type: argon2.argon2id }),
        role: 'ADMIN'
      }
    });
    console.log('Seeded admin:', adminEmail);
  }

  // Parent user
  const parentEmail = 'parent@example.com';
  const parent = await prisma.user.findUnique({ where: { email: parentEmail } });
  if (!parent) {
    await prisma.user.create({
      data: {
        email: parentEmail,
        passwordHash: await argon2.hash('Parent@123', { type: argon2.argon2id }),
        role: 'PARENT'
      }
    });
    console.log('Seeded parent:', parentEmail);
  }

  const existingNotifs = await prisma.notification.count();
  if (existingNotifs === 0) {
    await prisma.notification.createMany({
      data: [
        {
          title: 'Payment gateway maintenance',
          message: 'Scheduled maintenance tonight 22:00–23:00.',
          severity: 'WARNING',
        },
        {
          title: 'New Heart Program applications',
          message: '5 new applications submitted today.',
          severity: 'INFO',
        },
        {
          title: 'Backup completed',
          message: 'Monthly backup completed successfully.',
          severity: 'INFO',
        },
      ],
    });
    console.log('Seeded notifications.');
  }

  console.log('Seed complete.');
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
