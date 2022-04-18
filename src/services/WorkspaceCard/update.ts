import NotFoundError from '../../helpers/NotFoundError';
import { IWorkspaceCardUpdate } from '../../interfaces/routes';
import prisma from '../../prisma';

const update = async (id: string, payload: IWorkspaceCardUpdate) => {
  const selectedCard = await prisma.workspaceCard.findUnique({ where: { id } });

  if (!selectedCard) throw new NotFoundError('Card not found');

  if (payload.columnId) {
    const column = await prisma.workspaceColumn.findUnique({ where: { id: payload.columnId } });

    if (!column) throw new NotFoundError('Column not found');
  }

  return prisma.workspaceCard.update({ where: { id }, data: payload });
};

export { update };
