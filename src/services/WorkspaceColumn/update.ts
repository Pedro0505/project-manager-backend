import NotFoundError from '../../helpers/NotFoundError';
import { IWorkspaceColumnUpdate } from '../../interfaces/routes';
import prisma from '../../prisma';

const update = async (id: number, payload: IWorkspaceColumnUpdate) => {
  const selectedColumn = await prisma.workspaceColumn.findUnique({ where: { id } });

  if (!selectedColumn) throw new NotFoundError('Column not found');

  const result = await prisma.workspaceColumn.update({ where: { id }, data: payload });

  return result;
};

export { update };
