import { IUserDBResponse } from '../../interfaces/routes/IUserDBResponse';
import { IWorkspaceDBResponse } from '../../interfaces/routes/IWorkspaceDBResponse';
import prisma from '../../prisma';

const getAll = async (email: string) => {
  const { id } = await prisma.user.findFirst({ where: { email } }) as IUserDBResponse;

  const getAllWorkspace = await prisma.workspace.findMany(
    { where: { ownerId: id } },
  ) as IWorkspaceDBResponse[];

  return getAllWorkspace;
};

export { getAll };
