import { IUserSafe } from '../prisma';

export interface IUserRegister extends IUserSafe {
  id: string;
  uuid?: string;
}
