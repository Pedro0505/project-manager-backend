import { IUser, IUserSafe } from '../../src/interfaces/prisma';

interface IUserRegister {
  requestMock: IUser;
  responseMock: IUserSafe;
}

export const userRegister: IUserRegister = {
  requestMock: {
    email: 'simpson@gmail.com',
    firstName: 'Homer',
    lastName: 'Simpson',
    password: 'alishdahsid',
  },

  responseMock: {
    email: 'simpson@gmail.com',
    firstName: 'Homer',
    lastName: 'Simpson',
  },
};
