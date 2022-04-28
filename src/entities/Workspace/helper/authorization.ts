import prisma from '../../../database/prisma';
import NotFoundError from '../../../helpers/NotFoundError';
import UnauthorizedError from '../../../helpers/UnauthorizedError';

const workspaceAuthorization = async (userId: string, workspaceId: string) => {
  const findWorkspace = await prisma.workspace.findFirst({ where: { id: workspaceId } });

  if (!findWorkspace) throw new NotFoundError('workspace not found');

  if (findWorkspace.ownerId !== userId) throw new UnauthorizedError('operation not allowed');
};

export default workspaceAuthorization;
