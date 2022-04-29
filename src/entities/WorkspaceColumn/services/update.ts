import { IWorkspaceColumnUpdate } from '../../../typescript/interfaces/routes';
import prisma from '../../../database/prisma';
import columnAuthorization from '../helper/authorization';

const update = async (id: string, payload: IWorkspaceColumnUpdate, userId: string) => {
  await columnAuthorization(userId, id);

  await prisma.workspaceColumn.findUnique({ where: { id } });

  return prisma.workspaceColumn.update({ where: { id }, data: payload });
};

export { update };
