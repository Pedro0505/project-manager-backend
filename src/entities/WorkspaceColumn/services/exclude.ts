import prisma from '../../../database/prisma';
import columnAuthorization from '../helper/authorization';

const exclude = async (userId: string, id: string) => {
  await columnAuthorization(userId, id);

  return prisma.workspaceColumn.delete({ where: { id } });
};

export { exclude };
