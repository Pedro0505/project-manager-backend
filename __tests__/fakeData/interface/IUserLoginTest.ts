import { IUserLogin } from '../../../src/typescript/interfaces/routes';

interface IUserLoginTest {
  requestMock: IUserLogin;
  requestWrongEmailMock: IUserLogin;
  requestWrongPasswordMock: IUserLogin;
}

export { IUserLoginTest };
