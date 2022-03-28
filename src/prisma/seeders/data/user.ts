import * as argon2 from 'argon2';
import { IUser } from '../../../interfaces/prisma';

const userData = async (): Promise<IUser[]> => ([
  {
    firstName: 'Pedro',
    lastName: 'Henrique',
    email: 'pedro@gmail.com',
    password: await argon2.hash('12345678'),
  },
  {
    firstName: 'Matheus',
    lastName: 'Santos',
    email: 'matheus@gmail.com',
    password: await argon2.hash('12345678'),
  }]
);

export { userData };
