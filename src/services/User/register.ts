import prisma from '../../prisma';
import { IUser } from '../../interfaces/prisma';
import { IUserRegister } from '../../interfaces/routes/IUserRegister';

const register = async ({ firstName, lastName, email, password }: IUser):
  Promise<IUserRegister> => {
  const result = await prisma.user.create({ data: { firstName, lastName, email, password } });

  return { id: result.id, firstName, lastName, email };
};

export { register };
