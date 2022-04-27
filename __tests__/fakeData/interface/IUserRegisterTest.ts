import { IUser } from '../../../src/typescript/interfaces/prisma';
import { IUserRegister } from '../../../src/typescript/interfaces/routes';

interface IUserRegisterTest {
  requestMock: IUser;
  requestConflictMock: IUser;
  responseMock: IUserRegister;
}

export { IUserRegisterTest };
