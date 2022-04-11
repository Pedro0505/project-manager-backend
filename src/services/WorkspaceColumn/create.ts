import { IWorkspaceColumn, IWorkspaceColumnReturn } from '../../interfaces/routes';
import prisma from '../../prisma';

const create = async ({ title, workspaceId, index }: IWorkspaceColumn)
: Promise<IWorkspaceColumnReturn> => {
  const result = await prisma.workspaceColumn.create({ data: { title, workspaceId, index } });

  return result;
};

export { create };