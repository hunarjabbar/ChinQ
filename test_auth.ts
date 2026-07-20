import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function test() {
  const admin = await prisma.user.findUnique({ where: { email: 'admin@chinq.media' }});
  if (!admin) {
    console.log("Admin not found!");
  } else {
    console.log("Admin found:", admin);
    const isValid = await bcrypt.compare('admin123', admin.password);
    console.log("Password valid?", isValid);
  }
}
test().finally(() => prisma.$disconnect());
