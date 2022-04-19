import { IUserModel } from '../../src/interfaces/prisma';

export const matheus: IUserModel = {
  id: '21119b9d-af80-4e9f-8987-047f8f50a5fa',
  firstName: 'Matheus',
  lastName: 'Santos',
  email: 'matheus@gmail.com',
  password: '$argon2i$v=19$m=4096,t=3,p=1$X7r4K8ujPAuRdFMiERDJrA$iwBZrXgdJD4+I8gzI/F7ZUlCtc/aQ+XwSnOjOUb521I',
};

export const pedro: IUserModel = {
  id: 'e6dea152-388a-49a4-8c70-3cb73b3c97c2',
  firstName: 'Pedro',
  lastName: 'Henrique',
  email: 'pedro@gmail.com',
  password: '$argon2i$v=19$m=4096,t=3,p=1$ndoTB41e5ajszwTr2Qft/g$WTragLugvcACfzf3+0Q1gEpK2BQPTdxcy3MeJ4cBmRs',
};
