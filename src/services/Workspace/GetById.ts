import { checkOwnership } from '../../helpers';
import NotFoundError from '../../helpers/NotFoundError';
import { IWorkspaceDBResponse } from '../../interfaces/routes/IWorkspaceDBResponse';
import prisma from '../../prisma';

const getById = async (id: number, tokenEmail: string): Promise<IWorkspaceDBResponse> => {
  const workspace: IWorkspaceDBResponse | null = await prisma.workspace.findUnique({
    where: { id },
    include: {
      columns: {
        include: {
          cards: true,
        },
      },
    },
  });

  if (!workspace) throw new NotFoundError('workspace not found');

  await checkOwnership(tokenEmail, workspace.ownerId);

  return workspace;
};

export { getById };
