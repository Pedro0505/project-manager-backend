import NotFoundError from '../../helpers/NotFoundError';
import prisma from '../../prisma';

const update = async (id: number, title: string) => {
  const findColumn = await prisma.workspaceColumn.findUnique({ where: { id } });

  if (!findColumn) throw new NotFoundError('Column not found');

  await prisma.workspaceColumn.update({ where: { id }, data: { title } });
};

export { update };