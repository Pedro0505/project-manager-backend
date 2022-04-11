import argon2 from 'argon2';
import JwtGenerate from '../../helpers/JwtGenerate';
import NotFoundError from '../../helpers/NotFoundError';
import UnauthorizedError from '../../helpers/UnauthorizedError';
import { IUserLogin } from '../../interfaces/routes';
import prisma from '../../prisma';

const login = async ({ email, password }: IUserLogin): Promise<string> => {
  const result = await prisma.user.findUnique({ where: { email } });

  if (!result) throw new NotFoundError('email not found');

  const verify = await argon2.verify(result.password, password);

  if (!verify) throw new UnauthorizedError('wrong password');

  const token = JwtGenerate({ email, userId: result.id });

  return token;
};

export { login };
