import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  await prisma.user.upsert({
    where: { email: 'admin@chinq.media' },
    update: {
      password: hashedPassword,
      name: 'Test Admin',
      role: 'ADMIN'
    },
    create: {
      email: 'admin@chinq.media',
      password: hashedPassword,
      name: 'Test Admin',
      role: 'ADMIN'
    }
  });

  const hashedEditor = await bcrypt.hash('editor123', 10);
  
  await prisma.user.upsert({
    where: { email: 'editor@chinq.media' },
    update: {
      password: hashedEditor,
      name: 'Test Editor',
      role: 'EDITOR'
    },
    create: {
      email: 'editor@chinq.media',
      password: hashedEditor,
      name: 'Test Editor',
      role: 'EDITOR'
    }
  });

  console.log('✅ Temporary auth credentials seeded:');
  console.log('Admin: admin@chinq.media / admin123');
  console.log('Editor: editor@chinq.media / editor123');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
