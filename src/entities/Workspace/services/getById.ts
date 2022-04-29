import prisma from '../../../database/prisma';
import workspaceAuthorization from '../helper/authorization';

const getById = async (workspaceId: string, ownerId: string) => {
  await workspaceAuthorization(ownerId, workspaceId);

  const workspace = await prisma.workspace.findUnique({ where: { id: workspaceId } });

  return workspace;
};

export { getById };
