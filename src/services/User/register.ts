import prisma from '../../prisma';
import { IUser } from '../../interfaces/prisma';

const register = async ({ firstName, lastName, email, password }: IUser): Promise<IUser> => {
  const result = await prisma.user.create({ data: { firstName, lastName, email, password } });

  return result;
};

export default register;
