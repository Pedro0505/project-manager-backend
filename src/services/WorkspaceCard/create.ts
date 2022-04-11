import { generateUuid } from '../../helpers';
import { IWorkspaceCardCreate } from '../../interfaces/routes';
import prisma from '../../prisma';

const create = async (newcard: IWorkspaceCardCreate) => {
  const { content, title, columnId, index } = newcard;

  return prisma.workspaceCard.create({
    data: { content, title, columnId, index, id: generateUuid() },
  });
};

export { create };
