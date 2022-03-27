import request from 'supertest';
import app from '../src/app';
import prisma from '../src/prisma';
import * as fakeData from './fakeData';
import { userRegisterLogin } from './fakeData';
import { fakeLogin } from './fakeData/interface/fakeLogin';
import { resetDB } from './utils';

describe('POST /workspace', () => {
  let token: { token: string };

  beforeAll(async () => {
    await resetDB();
    const userRegister = await userRegisterLogin();
    await prisma.user.create({ data: userRegister });

    const { body } = await request(app)
    .post('/user/login')
    .send(fakeLogin);

    token = body;
  });

  afterAll(async () => {
    const deleteWorkspace = prisma.workspace.deleteMany();
    const deleteUser = prisma.user.deleteMany();
    
    await prisma.$transaction([deleteWorkspace, deleteUser])
    
    await prisma.$disconnect();
  });
  
  it('Quando o workspace é criado com sucesso', async () => {
    const { status, body } = await request(app)
    .post('/workspace')
    .set('Authorization', token.token)
    .send(fakeData.workspaceCreate.requestMock);

    expect(status).toBe(201);
    expect(body.data).toStrictEqual(fakeData.workspaceCreate.responseMock);
  })
});
