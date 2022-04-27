import NotFoundError from '../../../helpers/NotFoundError';
import prisma from '../../../database/prisma';

const exclude = async (id: string) => {
  const findColumn = await prisma.workspace.findUnique({ where: { id } });

  if (!findColumn) throw new NotFoundError('Workspace not found');

  await prisma.workspace.delete({ where: { id } });
};

export { exclude };
