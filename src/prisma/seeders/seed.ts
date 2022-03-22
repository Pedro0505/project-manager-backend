import prisma from '../index';
import userData from './seed.data';

async function main() {
  await prisma.user.createMany({ data: userData });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
