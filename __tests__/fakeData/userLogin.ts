import { IUserLoginTest } from "./interface";

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
