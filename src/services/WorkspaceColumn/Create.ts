import { IWorkspaceColumn, IWorkspaceColumnReturn } from '../../interfaces/routes';
import prisma from '../../prisma';

const create = async ({ title, workspaceId }: IWorkspaceColumn)
: Promise<IWorkspaceColumnReturn> => {
  const result = await prisma.workspaceColumn.create({ data: { title, workspaceId } });

  return {
    id: result.id,
    title,
  };
};

export { create };
