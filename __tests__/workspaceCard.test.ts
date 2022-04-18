import request from 'supertest';
import app from '../src/app';
import prisma from '../src/prisma';
import * as fakeData from './fakeData';
import * as seeds from './seeds';
import { verifyUuid } from './utils';

describe('Testes em /card', () => {
  describe('POST /card', () => {
    let token: string;

    beforeAll(async () => {
      const [matheus, pedro] = await Promise.all([seeds.matheus(), seeds.pedro()]);

      await prisma.$transaction([
        prisma.user.createMany({ data: [matheus, pedro] }),
        prisma.workspace.createMany({ data: seeds.allWorkspaces }),
        prisma.workspaceColumn.createMany({ data: seeds.allWorkspaceColumns }),
        prisma.workspaceCard.createMany({ data: seeds.allWorkspaceCards }),
      ]);

      const { body } = await request(app).post('/user/login').send(fakeData.user.login.request);
      token = body.token;
    });

    afterAll(async () => {
      await prisma.$transaction([
        prisma.workspaceCard.deleteMany(),
        prisma.workspaceColumn.deleteMany(),
        prisma.workspace.deleteMany(),
        prisma.user.deleteMany(),
      ]);

      await prisma.$disconnect();
    });

    it('quando o workspaceCard é criado com sucesso', async () => {
      const { status, body } = await request(app)
        .post('/card')
        .set('Authorization', token)
        .send(fakeData.workspaceCard.create.request);

      expect(status).toBe(201);
      expect(verifyUuid(body.data.id)).toBe(true);
      expect({
        content: body.data.content,
        columnId: body.data.columnId,
        index: body.data.index,
      }).toStrictEqual(fakeData.workspaceCard.create.response);
    });

    describe('quando o body do workspaceCard é invalido', () => {
      it('"columnId" não foi enviado', async () => {
        const { status, body } = await request(app)
          .post('/card')
          .set('Authorization', token)
          .send({ ...fakeData.workspaceCard.create.request, columnId: undefined });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"columnId" is required');
      });

      it('"columnId" como um number', async () => {
        const { status, body } = await request(app)
          .post('/card')
          .set('Authorization', token)
          .send({ ...fakeData.workspaceCard.create.request, columnId: 2 });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"columnId" must be a string');
      });

      it('"index" não foi enviado', async () => {
        const { status, body } = await request(app)
          .post('/card')
          .set('Authorization', token)
          .send({ ...fakeData.workspaceCard.create.request, index: undefined });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"index" is required');
      });

      it('"index" como uma string', async () => {
        const { status, body } = await request(app)
          .post('/card')
          .set('Authorization', token)
          .send({ ...fakeData.workspaceCard.create.request, index: 'a' });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"index" must be a number');
      });

      it('"content" não foi enviado', async () => {
        const { status, body } = await request(app)
          .post('/card')
          .set('Authorization', token)
          .send({ ...fakeData.workspaceCard.create.request, content: undefined });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"content" is required');
      });

      it('"content" como uma string vazia', async () => {
        const { status, body } = await request(app)
          .post('/card')
          .set('Authorization', token)
          .send({ ...fakeData.workspaceCard.create.request, content: '' });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"content" is not allowed to be empty');
      });
    });
  });
});
