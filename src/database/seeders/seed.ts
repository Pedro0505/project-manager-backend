import prisma from '../prisma/index';
import { userData, workspaceData, workspaceDataColumn, workspaceCardData } from './data';

async function main() {
  const userDataResult = await userData();

  await prisma.user.createMany({ data: userDataResult });
  await prisma.workspace.createMany({ data: workspaceData });
  await prisma.workspaceColumn.createMany({ data: workspaceDataColumn });
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

// ss
