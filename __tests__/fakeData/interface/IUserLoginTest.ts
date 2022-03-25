import { IUserLogin } from '../../../src/interfaces/routes';

interface IUserLoginTest {
  requestMock: IUserLogin;
  requestWrongEmailMock: IUserLogin;
  requestWrongPasswordMock: IUserLogin;
}

export { IUserLoginTest };
