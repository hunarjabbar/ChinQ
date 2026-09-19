import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@iraqi-chineseagency.com';
  const password = 'AdminPassword123!';
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      role: 'SUPERADMIN', 
      name: 'Super Admin'
    },
    create: {
      email,
      password: hashedPassword,
      name: 'Super Admin',
      role: 'SUPERADMIN',
    }
  });

  console.log('Admin user created successfully:', user.email);
}

main().catch(console.error).finally(() => prisma.$disconnect());
