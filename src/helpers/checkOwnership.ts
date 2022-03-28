import { IUserDBResponse } from '../interfaces/routes';
import prisma from '../prisma';
import UnauthorizedError from './UnauthorizedError';

export const checkOwnership = async (tokenEmail: string, ownerId: number): Promise<void> => {
  const { id } = (await prisma.user.findUnique({
    where: { email: tokenEmail },
  })) as IUserDBResponse;

  if (id !== ownerId) throw new UnauthorizedError('operation not allowed');
};
