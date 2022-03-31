import NotFoundError from '../../helpers/NotFoundError';
import prisma from '../../prisma';

const exclude = async (id: number) => {
  const findColumn = await prisma.workspaceColumn.findUnique({ where: { id } });

  if (!findColumn) throw new NotFoundError('Column not found');

  await prisma.workspaceColumn.delete({ where: { id } });
};

export { exclude };
