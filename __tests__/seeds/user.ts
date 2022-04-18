import { hash } from 'argon2';
import { IUserModel } from '../../src/interfaces/prisma';

export const matheus = async (): Promise<IUserModel> => ({
  id: '64bc581e-937d-4de1-bc5b-82279d56856e',
  firstName: 'Matheus',
  lastName: 'Santos',
  email: 'matheus@gmail.com',
  password: await hash('12345678'),
});

export const pedro = async (): Promise<IUserModel> => ({
  id: 'e6dea152-388a-49a4-8c70-3cb73b3c97c2',
  firstName: 'Pedro',
  lastName: 'Henrique',
  email: 'pedro@gmail.com',
  password: await hash('12345678'),
});
