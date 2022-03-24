import { IUser, IUserSafe } from '../../src/interfaces/prisma';

interface IUserRegister {
  requestMock: IUser;
  requestConflictMock: IUser;
  responseMock: IUserSafe;
}

export const userRegister: IUserRegister = {
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
    email: 'simpson@gmail.com',
    firstName: 'Homer',
    lastName: 'Simpson',
  },
};
