import { IWorkspaceCreate, IWorkspaceCreateReturn } from '../../interfaces/routes';
import prisma from '../../prisma';

const Create = async ({ owerId, workspaceName } : IWorkspaceCreate):
Promise<IWorkspaceCreateReturn> => {
  const result = await prisma.workspace.create({ data: { name: workspaceName, ownerId: owerId } });

  return {
    id: result.id,
    workspaceName,
  };
};

export { Create };
