import NotFoundError from '../../helpers/NotFoundError';
import { IWorkspaceColumnUpdate } from '../../interfaces/routes';
import prisma from '../../prisma';

const update = async (id: string, payload: IWorkspaceColumnUpdate) => {
  const selectedColumn = await prisma.workspaceColumn.findUnique({ where: { id } });

  if (!selectedColumn) throw new NotFoundError('Column not found');

  return prisma.workspaceColumn.update({ where: { id }, data: payload });
};

export { update };
