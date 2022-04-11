import { generateUuid } from '../../helpers';
import { IWorkspaceCreate, IWorkspaceCreateReturn } from '../../interfaces/routes';
import prisma from '../../prisma';

const create = async (newWorksapce: IWorkspaceCreate): Promise<IWorkspaceCreateReturn> => {
  const { ownerId, workspaceName } = newWorksapce;

  const result = await prisma.workspace.create({
    data: { name: workspaceName, ownerId, id: generateUuid() },
  });

  return {
    id: result.id,
    workspaceName,
  };
};

export { create };
