import NotFoundError from '../../helpers/NotFoundError';
import prisma from '../../prisma';

const exclude = async (id: number) => {
  const findColumn = await prisma.workspaceCard.findUnique({ where: { id } });

  if (!findColumn) throw new NotFoundError('Card not found');

  await prisma.workspaceCard.delete({ where: { id } });
};

export { exclude };
