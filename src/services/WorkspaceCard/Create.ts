import { IWorkspaceCardCreate, IWorkspaceCardCreateReturn } from '../../interfaces/routes';
import prisma from '../../prisma';

const create = async ({ content, title, columnId }: IWorkspaceCardCreate)
: Promise<IWorkspaceCardCreateReturn> => {
  const result = await prisma.workspaceCard.create({ data: { content, title, columnId } });

  return {
    id: result.id,
    title,
    content,
  };
};

export { create };
