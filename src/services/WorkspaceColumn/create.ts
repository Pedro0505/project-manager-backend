import { generateUuid } from '../../helpers';
import { IWorkspaceColumn } from '../../interfaces/routes';
import prisma from '../../prisma';

const create = async (newColumn: IWorkspaceColumn) => {
  const { title, workspaceId, index } = newColumn;

  return prisma.workspaceColumn.create({ data: { title, workspaceId, index, id: generateUuid() } });
};

export { create };
