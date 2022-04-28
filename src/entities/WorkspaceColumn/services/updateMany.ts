import prisma from '../../../database/prisma';
import columnAuthorization from '../helper/authorization';

const updateMany = async (payload: { id: string }[], userId: string) => {
  const validations = payload.map(({ id }) => columnAuthorization(userId, id));

  await Promise.all(validations);

  const updateOperations = payload.map(({ id }, index) =>
    prisma.workspaceColumn.update({
      where: { id },
      data: { index },
    }),
  );

  const result = await prisma.$transaction(updateOperations);

  return result;
};

export { updateMany };
