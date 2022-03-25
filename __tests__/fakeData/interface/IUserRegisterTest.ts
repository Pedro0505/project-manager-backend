import { IUser } from '../../../src/interfaces/prisma';
import { IUserRegister } from '../../../src/interfaces/routes';

interface IUserRegisterTest {
  requestMock: IUser;
  requestConflictMock: IUser;
  responseMock: IUserRegister;
}

export { IUserRegisterTest };
