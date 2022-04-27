import prisma from '../../../database/prisma';

const getAll = async (ownerId: string) => prisma.workspace.findMany({ where: { ownerId } });

export { getAll };
