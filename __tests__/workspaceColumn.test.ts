import request from 'supertest';
import app from '../src/app';
import prisma from '../src/prisma';
import * as fakeData from './fakeData';

describe('POST /column', () => {
  beforeAll(async () => {
    await prisma.user.create({ data: fakeData.userRegister.requestConflictMock });
    await prisma.workspace.create({ data: fakeData.workspaceColumnCreate.workspaceCreate });
  });

  afterAll(async () => {
    await prisma.workspaceColumn.deleteMany();
    await prisma.workspace.deleteMany();
    await prisma.user.deleteMany();

    await prisma.$disconnect();
  });

  it('Quando o workspace é criado com sucesso', async () => {
    const { status, body } = await request(app)
    .post('/column')
    .send(fakeData.workspaceColumnCreate.requestMock);

    expect(status).toBe(201);
    expect(body.data).toStrictEqual(fakeData.workspaceColumnCreate.responseMock);
  });
});
