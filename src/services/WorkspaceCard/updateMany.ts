import prisma from '../../prisma';

const updateMany = async (payload: { id: string; columnId?: string }[]) => {
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
