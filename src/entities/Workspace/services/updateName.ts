import prisma from '../../../database/prisma';
import workspaceAuthorization from '../helper/authorization';

const updateName = async (name: string, id: string, userId: string) => {
  await workspaceAuthorization(userId, id);

  const response = await prisma.workspace.update({
    where: { id },
    data: { name },
    select: { id: true, name: true },
  });

  return response;
};

export { updateName };
