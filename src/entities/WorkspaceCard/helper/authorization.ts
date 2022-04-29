import prisma from '../../../database/prisma';
import NotFoundError from '../../../helpers/NotFoundError';
import UnauthorizedError from '../../../helpers/UnauthorizedError';

const cardAuthorization = async (userId: string, cardId: string) => {
  const findCard = await prisma.workspaceCard.findFirst({
    where: { id: cardId },
    include: { column: { include: { workspace: true } } },
  });

  if (!findCard) throw new NotFoundError('Card not found');

  const { workspace } = findCard.column;

  if (workspace.ownerId !== userId) throw new UnauthorizedError('operation not allowed');
};

export default cardAuthorization;
