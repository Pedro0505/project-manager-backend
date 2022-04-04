import NotFoundError from '../../helpers/NotFoundError';
import { IWorkspaceCardUpdate, IWorkspaceCardResponse } from '../../interfaces/routes';
import prisma from '../../prisma';

const update = async (
  id: number,
  payload: IWorkspaceCardUpdate,
): Promise<IWorkspaceCardResponse> => {
  const selectedCard = await prisma.workspaceCard.findUnique({ where: { id } });

  if (!selectedCard) throw new NotFoundError('Card not found');

  const result = await prisma.workspaceCard.update({ where: { id }, data: payload });

  return result;
};

export { update };
