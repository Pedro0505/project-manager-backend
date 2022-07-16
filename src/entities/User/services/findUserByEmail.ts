import NotFoundError from '../../../helpers/NotFoundError';
import prisma from '../../../database/prisma';

const findUserByEmail = async (querry: string) => {
  const findUser = await prisma.user.findUnique({
    where: { email: querry },
    select: { email: true, uuid: true },
  });

  if (!findUser) throw new NotFoundError('User Not Found');

  return findUser;
};

export { findUserByEmail };
