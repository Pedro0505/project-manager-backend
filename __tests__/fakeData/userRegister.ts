import * as argon2 from 'argon2';
import { IUserRegisterTest } from './interface';
import { IUser } from '../../src/interfaces/prisma';

const userRegister: IUserRegisterTest = {
  requestMock: {
    email: 'simpson@gmail.com',
    firstName: 'Homer',
    lastName: 'Simpson',
    password: 'alishdahsid',
  },

  requestConflictMock: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@gmail.com',
    password: '123456',
  },

  responseMock: {
    id: 2,
    email: 'simpson@gmail.com',
    firstName: 'Homer',
    lastName: 'Simpson',
  },
};

const userRegisterLogin = async (): Promise<IUser> => ({
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@gmail.com',
  password: await argon2.hash('123456'),
})

export { userRegister, userRegisterLogin }
