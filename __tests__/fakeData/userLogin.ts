import { IUserLogin } from '../../src/interfaces/routes';

interface IUserLoginTest {
  requestMock: IUserLogin;
  requestWrongEmailMock: IUserLogin;
  requestWrongPasswordMock: IUserLogin;
}

export const userLogin: IUserLoginTest = {
  requestMock: {
    email: 'simpson@gmail.com',
    password: 'alishdahsid',
  },

  requestWrongEmailMock: {
    email: 'liza@gmail.com',
    password: 'alishdahsid',
  },

  requestWrongPasswordMock: {
    email: 'simpson@gmail.com',
    password: '123456789',
  },
};
