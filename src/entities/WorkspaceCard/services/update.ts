import NotFoundError from '../../../helpers/NotFoundError';
import { IWorkspaceCardUpdate } from '../../../typescript/interfaces/routes';
import prisma from '../../../database/prisma';
import cardAuthorization from '../helper/authorization';

const update = async (id: string, payload: IWorkspaceCardUpdate, userId: string) => {
  await cardAuthorization(userId, id);

  if (payload.columnId) {
    const column = await prisma.workspaceColumn.findUnique({ where: { id: payload.columnId } });

    if (!column) throw new NotFoundError('Column not found');
  }

  return prisma.workspaceCard.update({ where: { id }, data: payload });
};

export { update };
