import { hash } from 'argon2';
import { IUserModel } from '../../../src/interfaces/prisma';

export const matheus = async (): Promise<IUserModel> => ({
  id: '64bc581e-937d-4de1-bc5b-82279d56856e',
  firstName: 'Matheus',
  lastName: 'Santos',
  email: 'matheus@gmail.com',
  password: await hash('12345678'),
});
