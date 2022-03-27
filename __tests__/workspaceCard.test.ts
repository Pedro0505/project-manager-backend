import request from 'supertest';
import app from '../src/app';
import prisma from '../src/prisma';
import * as fakeData from './fakeData';
import { resetDB } from './utils';

describe('POST /card', () => {
  beforeAll(async () => {
    await resetDB();

    await prisma.user.create({ data: fakeData.userRegister.requestConflictMock });
    await prisma.workspace.create({ data: fakeData.workspaceColumnCreate.workspaceCreate });
    await prisma.workspaceColumn.create({ data: fakeData.workspaceCardCreate.workspaceColumnCreate });
  });

  afterAll(async () => {
    const deleteWorkspaceCard = prisma.workspaceCard.deleteMany();
    const deleteWorkspaceColumn = prisma.workspaceColumn.deleteMany();
    const deleteWorkspace = prisma.workspace.deleteMany();
    const deleteUser = prisma.user.deleteMany();

    await prisma.$transaction([deleteWorkspaceCard, deleteWorkspaceColumn, deleteWorkspace, deleteUser])

    await prisma.$disconnect();
  });

  it('Quando o workspaceCard é criado com sucesso', async () => {
    const { status, body } = await request(app)
    .post('/card')
    .send(fakeData.workspaceCardCreate.requestMock);

    expect(status).toBe(201);
    expect(body.data).toStrictEqual(fakeData.workspaceCardCreate.responseMock);
  });
});
