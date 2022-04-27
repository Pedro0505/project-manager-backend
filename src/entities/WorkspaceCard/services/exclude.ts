import NotFoundError from '../../../helpers/NotFoundError';
import prisma from '../../../database/prisma';

const exclude = async (id: string) => {
  const findColumn = await prisma.workspaceCard.findUnique({ where: { id } });

  if (!findColumn) throw new NotFoundError('Card not found');

  return prisma.workspaceCard.delete({ where: { id } });
};

export { exclude };
