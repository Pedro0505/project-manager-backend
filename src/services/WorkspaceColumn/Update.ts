import prisma from '../../prisma';

const update = async (id: number, title: string) =>
  prisma.workspaceColumn.update({ where: { id }, data: { title } });

export { update };
