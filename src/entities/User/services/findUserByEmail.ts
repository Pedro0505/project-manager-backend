import NotFoundError from '../../../helpers/NotFoundError';
import prisma from '../../../database/prisma';

const findeUserByEmail = async (querry: string) => {
  const findUser = await prisma.user.findUnique({ where: { email: querry } });

  if (!findUser) throw new NotFoundError('User Not Found');

  return findUser;
};

export { findeUserByEmail };
