import * as argon2 from 'argon2';
import prisma from '../../prisma';
import { IUser } from '../../interfaces/prisma';
import { IUserRegister } from '../../interfaces/routes/IUserRegister';
import ConflictError from '../../helpers/ConflictError';

const register = async ({ firstName, lastName, email, password, uuid }: IUser):
  Promise<IUserRegister> => {
  const exist = await prisma.user.findUnique({ where: { email } });

  if (exist) throw new ConflictError('email already registered');

  const hash = await argon2.hash(password);

  const result = await prisma.user.create({ data: { firstName,
    lastName,
    email,
    password: hash,
    uuid } });

  return { id: result.id, firstName, lastName, email, uuid };
};

export { register };
