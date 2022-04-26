import { generateUuid } from '../../helpers';
import { IWorkspaceColumn } from '../../interfaces/routes';
import prisma from '../../prisma';

const create = async (newColumn: IWorkspaceColumn) => {
  const { title, workspaceId } = newColumn;

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
