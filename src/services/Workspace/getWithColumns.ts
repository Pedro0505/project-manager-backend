import NotFoundError from '../../helpers/NotFoundError';
import UnauthorizedError from '../../helpers/UnauthorizedError';
import prisma from '../../prisma';

const getWithColumns = async (workspaceId: string, ownerId: string) => {
  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
    include: {
      columns: {
        include: {
          cards: true,
        },
      },
    },
  });

  if (!workspace) throw new NotFoundError('workspace not found');
  if (workspace.ownerId !== ownerId) throw new UnauthorizedError('operation not allowed');

  return workspace;
};

export { getWithColumns };
