import * as argon2 from 'argon2';
import prisma from '../../../database/prisma';
import { IUser } from '../../../typescript/interfaces/prisma';
import { IUserRegister } from '../../../typescript/interfaces/routes/IUserRegister';
import ConflictError from '../../../helpers/ConflictError';
import { generateUuid } from '../../../helpers';

const register = async (newUser: IUser): Promise<IUserRegister> => {
  const { firstName, lastName, email, password, uuid } = newUser;

  const exist = await prisma.user.findUnique({ where: { email } });

  if (exist) throw new ConflictError('email already registered');

  const hash = await argon2.hash(password);

  const result = await prisma.user.create({
    data: { ...newUser, id: generateUuid(), password: hash },
  });

  return { id: result.id, firstName, lastName, email, uuid };
};

export { register };
