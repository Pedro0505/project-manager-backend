import prisma from '../../../database/prisma';
import NotFoundError from '../../../helpers/NotFoundError';
import UnauthorizedError from '../../../helpers/UnauthorizedError';

const columnAuthorization = async (userId: string, columnId: string) => {
  const findColumn = await prisma.workspaceColumn.findFirst({
    where: { id: columnId },
    include: { workspace: true },
  });

  if (!findColumn) throw new NotFoundError('Column not found');

  if (findColumn.workspace.ownerId !== userId) throw new UnauthorizedError('operation not allowed');
};

export default columnAuthorization;
