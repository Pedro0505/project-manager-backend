import prisma from '../index';
import data from './data';

async function main() {
  await prisma.user.createMany({ data: data.userData });
  await prisma.workspace.createMany({ data: data.workspaceData });
  await prisma.workspaceColumn.createMany({ data: data.workspaceColumnData });
  await prisma.workspaceCard.createMany({ data: data.workspaceCardData });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
