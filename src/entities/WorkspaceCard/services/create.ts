import { generateUuid } from '../../../helpers';
import { IWorkspaceCardCreate } from '../../../typescript/interfaces/routes';
import prisma from '../../../database/prisma';
import columnAuthorization from '../../WorkspaceColumn/helper/authorization';

const create = async (newcard: IWorkspaceCardCreate, userId: string) => {
  const { content, title, columnId } = newcard;

  await columnAuthorization(userId, columnId);

  const result = await prisma.workspaceCard.findMany({
    where: { columnId },
    orderBy: { index: 'desc' },
    take: 1,
  });

  const greaterSavedIndex = result[0]?.index ?? -1;

  return prisma.workspaceCard.create({
    data: { content, title, columnId, index: greaterSavedIndex + 1, id: generateUuid() },
  });
};

export { create };
