import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const genres = ['Romance', 'Horror', 'Thriller', 'Drama', 'Fantasy'];
  for (const name of genres) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
}

main().finally(() => prisma.$disconnect());