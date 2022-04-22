import { generateUuid } from '../../helpers';
import { IWorkspaceCardCreate } from '../../interfaces/routes';
import prisma from '../../prisma';

const create = async (newcard: IWorkspaceCardCreate) => {
  const { content, title, columnId } = newcard;

  const [{ index: greaterSavedIndex }] = await prisma.workspaceCard.findMany({
    where: { columnId },
    orderBy: { index: 'desc' },
    take: 1,
  });

  return prisma.workspaceCard.create({
    data: { content, title, columnId, index: greaterSavedIndex + 1, id: generateUuid() },
  });
};

export { create };
