import prisma from '../../../database/prisma';
import workspaceAuthorization from '../helper/authorization';

const exclude = async (id: string, userId: string) => {
  await workspaceAuthorization(userId, id);

  await prisma.workspace.delete({ where: { id } });
};

export { exclude };
