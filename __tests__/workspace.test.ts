import request from 'supertest';
import app from '../src/app';
import prisma from '../src/prisma';
import * as fakeData from './fakeData';
import { resetDB } from './utils';

describe('POST /workspace', () => {
  beforeAll(async () => {
    await resetDB();
    await prisma.user.create({ data: fakeData.userRegister.requestConflictMock });
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
    .send(fakeData.workspaceCreate.requestMock);

    expect(status).toBe(201);
    expect(body.data).toStrictEqual(fakeData.workspaceCreate.responseMock);
  })
});
