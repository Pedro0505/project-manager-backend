import prisma from '../../../database/prisma';
import columnAuthorization from '../../WorkspaceColumn/helper/authorization';
import cardAuthorization from '../helper/authorization';

const updateMany = async (payload: { id: string; columnId: string }[], userId: string) => {
  const validationsColumn = payload.map(({ columnId }) => columnAuthorization(userId, columnId));
  const validationsCard = payload.map(({ id }) => cardAuthorization(userId, id));

  await Promise.all([...validationsCard, ...validationsColumn]);

  const updateOperations = payload.map(({ id, columnId }, index) =>
    prisma.workspaceCard.update({
      where: { id },
      data: { index, columnId },
    }),
  );

  const result = await prisma.$transaction(updateOperations);

  return result;
};

export { updateMany };
