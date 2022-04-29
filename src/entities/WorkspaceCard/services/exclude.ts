import prisma from '../../../database/prisma';
import cardAuthorization from '../helper/authorization';

const exclude = async (id: string, userId: string) => {
  await cardAuthorization(userId, id);

  return prisma.workspaceCard.delete({ where: { id } });
};

export { exclude };
