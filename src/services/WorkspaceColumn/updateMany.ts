import prisma from '../../prisma';

const updateMany = async (payload: { id: string }[]) => {
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
