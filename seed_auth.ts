import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  await prisma.user.upsert({
    where: { email: 'admin@iraqi-chineseagency.com' },
    update: {
      password: hashedPassword,
      name: 'Test Admin',
      role: 'ADMIN'
    },
    create: {
      email: 'admin@iraqi-chineseagency.com',
      password: hashedPassword,
      name: 'Test Admin',
      role: 'ADMIN'
    }
  });

  const hashedEditor = await bcrypt.hash('editor123', 10);
  
  await prisma.user.upsert({
    where: { email: 'editor@iraqi-chineseagency.com' },
    update: {
      password: hashedEditor,
      name: 'Test Editor',
      role: 'EDITOR'
    },
    create: {
      email: 'editor@iraqi-chineseagency.com',
      password: hashedEditor,
      name: 'Test Editor',
      role: 'EDITOR'
    }
  });

  console.log('✅ Temporary auth credentials seeded:');
  console.log('Admin: admin@iraqi-chineseagency.com / admin123');
  console.log('Editor: editor@iraqi-chineseagency.com / editor123');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
