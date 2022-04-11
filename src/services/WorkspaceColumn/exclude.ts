import NotFoundError from '../../helpers/NotFoundError';
import prisma from '../../prisma';

const exclude = async (id: string) => {
  const findColumn = await prisma.workspaceColumn.findUnique({ where: { id } });

  if (!findColumn) throw new NotFoundError('Column not found');

  return prisma.workspaceColumn.delete({ where: { id } });
};

export { exclude };
