import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  await prisma.user.upsert({
    where: { email: 'admin@iraqchinadaily.media' },
    update: {
      password: hashedPassword,
      name: 'Test Admin',
      role: 'ADMIN'
    },
    create: {
      email: 'admin@iraqchinadaily.media',
      password: hashedPassword,
      name: 'Test Admin',
      role: 'ADMIN'
    }
  });

  const hashedEditor = await bcrypt.hash('editor123', 10);
  
  await prisma.user.upsert({
    where: { email: 'editor@iraqchinadaily.media' },
    update: {
      password: hashedEditor,
      name: 'Test Editor',
      role: 'EDITOR'
    },
    create: {
      email: 'editor@iraqchinadaily.media',
      password: hashedEditor,
      name: 'Test Editor',
      role: 'EDITOR'
    }
  });

  console.log('✅ Temporary auth credentials seeded:');
  console.log('Admin: admin@iraqchinadaily.media / admin123');
  console.log('Editor: editor@iraqchinadaily.media / editor123');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
