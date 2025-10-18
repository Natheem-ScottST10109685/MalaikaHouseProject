import { prisma } from './index.js';
import argon2 from 'argon2';

async function main() {
  const admin = await prisma.user.findUnique({ where: { email: 'admin@example.com' } });
  if (!admin) {
    await prisma.user.create({
      data: {
        email: 'admin@example.com',
        passwordHash: await argon2.hash('Admin@123', { type: argon2.argon2id }),
        role: 'ADMIN'
      }
    });
  }
  console.log('Seed complete.');
}

main().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});