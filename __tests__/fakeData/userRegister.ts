import { IUser } from '../../src/interfaces/prisma';
import { IUserRegister } from '../../src/interfaces/routes';

interface IUserRegisterTest {
  requestMock: IUser;
  requestConflictMock: IUser;
  responseMock: IUserRegister;
}

export const userRegister: IUserRegisterTest = {
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
