import request from 'supertest';
import app from '../src/app';
import prisma from '../src/prisma';
import * as fakeData from './fakeData';
import { resetDB } from './utils';

describe('POST /column', () => {
  beforeAll(async () => {
    await resetDB();

    await prisma.user.create({ data: fakeData.userRegister.requestConflictMock });
    await prisma.workspace.create({ data: fakeData.workspaceColumnCreate.workspaceCreate });
  });

  afterAll(async () => {
    const deleteWorkspaceColumn = prisma.workspaceColumn.deleteMany();
    const deleteWorkspace = prisma.workspace.deleteMany();
    const deleteUser = prisma.user.deleteMany();

    await prisma.$transaction([deleteWorkspaceColumn, deleteWorkspace, deleteUser])

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
