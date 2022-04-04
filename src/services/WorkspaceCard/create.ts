import { IWorkspaceCardCreate, IWorkspaceCardCreateReturn } from '../../interfaces/routes';
import prisma from '../../prisma';

const create = async ({ content, title, columnId, index }: IWorkspaceCardCreate)
: Promise<IWorkspaceCardCreateReturn> => {
  const result = await prisma.workspaceCard.create({ data: { content, title, columnId, index } });

  return result;
};

export { create };
