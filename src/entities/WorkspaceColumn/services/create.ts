import { generateUuid } from '../../../helpers';
import { IWorkspaceColumn } from '../../../typescript/interfaces/routes';
import prisma from '../../../database/prisma';
import workspaceAuthorization from '../../Workspace/helper/authorization';

const create = async (newColumn: IWorkspaceColumn, userId: string) => {
  const { title, workspaceId } = newColumn;

  await workspaceAuthorization(userId, workspaceId);

  const result = await prisma.workspaceColumn.findMany({
    where: { workspaceId },
    orderBy: { index: 'desc' },
    take: 1,
  });

  const greaterSavedIndex = result[0]?.index ?? -1;

  return prisma.workspaceColumn.create({
    data: { title, workspaceId, index: greaterSavedIndex + 1, id: generateUuid() },
  });
};

export { create };
