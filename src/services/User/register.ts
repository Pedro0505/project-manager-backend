import prisma from '../../prisma';
import { IUser } from '../../interfaces/prisma';
import { IUserRegister } from '../../interfaces/routes/IUserRegister';
import ConflictError from '../../helpers/ConflictError';

const register = async ({ firstName, lastName, email, password }: IUser):
  Promise<IUserRegister> => {
  const exist = await prisma.user.findUnique({ where: { email } });

  if (exist) throw new ConflictError('email already registered');

  const result = await prisma.user.create({ data: { firstName, lastName, email, password } });

  return { id: result.id, firstName, lastName, email };
};

export { register };
