import NotFoundError from '../../helpers/NotFoundError';
import { IUserDBResponse } from '../../interfaces/routes/IUserDBResponse';
import { IWorkspaceDBResponse } from '../../interfaces/routes/IWorkspaceDBResponse';
import prisma from '../../prisma';

const getAll = async (email: string) => {
  const result = await prisma.user.findFirst({ where: { email } }) as IUserDBResponse;

  if (!result) throw new NotFoundError('User Not Found');

  const getAllWorkspace = await prisma.workspace.findMany(
    { where: { ownerId: result.id } },
  ) as IWorkspaceDBResponse[];

  return getAllWorkspace;
};

export { getAll };
