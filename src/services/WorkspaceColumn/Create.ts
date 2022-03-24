import { IWorkspaceColumn, IWorkspaceColumnReturn } from '../../interfaces/routes';
import prisma from '../../prisma';

const Create = async ({ title, workspaceId }: IWorkspaceColumn)
: Promise<IWorkspaceColumnReturn> => {
  const result = await prisma.workspaceColumn.create({ data: { title, workspaceId } });

  return {
    id: result.id,
    title,
  };
};

export { Create };
