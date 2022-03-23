import prisma from '../index';
import { userData, workspaceData, workspaceColumnData, workspaceCardData } from './data';

async function main() {
  await prisma.user.createMany({ data: userData });
  await prisma.workspace.createMany({ data: workspaceData });
  await prisma.workspaceColumn.createMany({ data: workspaceColumnData });
  await prisma.workspaceCard.createMany({ data: workspaceCardData });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
