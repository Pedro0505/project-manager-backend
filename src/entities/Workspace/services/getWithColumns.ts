import prisma from '../../../database/prisma';
import workspaceAuthorization from '../helper/authorization';

const getWithColumns = async (workspaceId: string, ownerId: string) => {
  await workspaceAuthorization(ownerId, workspaceId);

  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
    include: {
      columns: {
        include: {
          cards: { orderBy: { index: 'asc' } },
        },
        orderBy: { index: 'asc' },
      },
    },
  });

  return workspace;
};

export { getWithColumns };
