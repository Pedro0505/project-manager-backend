import request from 'supertest';
import app from '../src/app';
import prisma from '../src/prisma';
import * as fakeData from './fakeData';
import * as seeds from './seeds';
import { verifyUuid } from './utils';

describe('Testes em /workspace', () => {
  describe('POST /workspace', () => {
    let token: string;

    beforeAll(async () => {
      const [matheus, pedro] = await Promise.all([seeds.matheus(), seeds.pedro()]);

      await prisma.$transaction([
        prisma.user.createMany({ data: [matheus, pedro] }),
        prisma.workspace.createMany({ data: seeds.allWorkspaces }),
      ]);

      const { body } = await request(app).post('/user/login').send(fakeData.user.login.request);
      token = body.token;
    });

    afterAll(async () => {
      await prisma.$transaction([prisma.workspace.deleteMany(), prisma.user.deleteMany()]);

      await prisma.$disconnect();
    });

    it('quando o workspace é criado com sucesso', async () => {
      const { status, body } = await request(app)
        .post('/workspace')
        .set('Authorization', token)
        .send(fakeData.workspace.create.request);

      expect(status).toBe(201);
      expect(body.data.workspaceName).toBe(fakeData.workspace.create.response.workspaceName);
      expect(verifyUuid(body.data.id)).toBe(true);
    });

    describe('quando o body do workspace é invalido', () => {
      it('"workspaceName" não foi enviado', async () => {
        const { status, body } = await request(app)
          .post('/workspace')
          .set('Authorization', token)
          .send({ ...fakeData.workspace.create.request, workspaceName: undefined });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"workspaceName" is required');
      });

      it('quando "workspaceName" é uma string vazia', async () => {
        const { status, body } = await request(app)
          .post('/workspace')
          .set('Authorization', token)
          .send({ ...fakeData.workspace.create.request, workspaceName: '' });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"workspaceName" is not allowed to be empty');
      });
    });
  });
});
