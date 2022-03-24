import prisma from '../../prisma';
import { IUser, IUserSafe } from '../../interfaces/prisma';

const register = async ({ firstName, lastName, email, password }: IUser): Promise<IUserSafe> => {
  await prisma.user.create({ data: { firstName, lastName, email, password } });

  return { firstName, lastName, email };
};

export default register;
