import { hash } from 'argon2';
import { IUserModel } from '../../src/interfaces/prisma';

export const matheus = async (): Promise<IUserModel> => ({
  id: '21119b9d-af80-4e9f-8987-047f8f50a5fa',
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
