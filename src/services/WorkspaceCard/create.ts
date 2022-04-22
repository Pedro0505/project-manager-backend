import { generateUuid } from '../../helpers';
import { IWorkspaceCardCreate } from '../../interfaces/routes';
import prisma from '../../prisma';

const create = async (newcard: IWorkspaceCardCreate) => {
  const { content, title, columnId } = newcard;

  const result = await prisma.workspaceCard.findMany({
    where: { columnId },
    orderBy: { index: 'desc' },
    take: 1,
  });

  const greaterSavedIndex = result[0]?.index || -1;

  return prisma.workspaceCard.create({
    data: { content, title, columnId, index: greaterSavedIndex + 1, id: generateUuid() },
  });
};

export { create };
