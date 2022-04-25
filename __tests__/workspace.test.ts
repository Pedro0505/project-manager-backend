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
      await prisma.$transaction([
        prisma.user.createMany({ data: [seeds.matheus, seeds.pedro] }),
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

      it('"workspaceName" é uma string vazia', async () => {
        const { status, body } = await request(app)
          .post('/workspace')
          .set('Authorization', token)
          .send({ ...fakeData.workspace.create.request, workspaceName: '' });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"workspaceName" is not allowed to be empty');
      });
    });

    describe('quando o auth da problema', () => {
      it('token não enviado', async () => {
        const { status, body } = await request(app)
          .post('/workspace')
          .send(fakeData.workspace.create.request);

        expect(status).toBe(401);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('token not found');
      });

      it('token inválido', async () => {
        const { status, body } = await request(app)
          .post('/workspace')
          .set('Authorization', 'matheuspedroprojectmanager')
          .send(fakeData.workspace.create.request);

        expect(status).toBe(401);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('expired or invalid token');
      });
    });
  });

  describe('EXCLUDE /workspace', () => {
    let token: string;

    beforeAll(async () => {
      await prisma.$transaction([
        prisma.user.createMany({ data: [seeds.matheus, seeds.pedro] }),
        prisma.workspace.createMany({ data: seeds.allWorkspaces }),
      ]);

      const { body } = await request(app).post('/user/login').send(fakeData.user.login.request);
      token = body.token;
    });

    afterAll(async () => {
      await prisma.$transaction([prisma.workspace.deleteMany(), prisma.user.deleteMany()]);

      await prisma.$disconnect();
    });

    it('Teste caso de sucesso de excluir', async () => {
      const { status: statusFirstTime } = await request(app)
      .delete('/workspace/85e57338-db9d-4913-adbf-058b7a68d730')
      .set('Authorization', token);

      const { status: statusSecondTime, body } = await request(app)
      .delete('/workspace/85e57338-db9d-4913-adbf-058b7a68d730')
      .set('Authorization', token);

      expect(statusFirstTime).toBe(204);
      expect(statusSecondTime).toBe(404);
      expect(body.error.message).toBe('Workspace not found');
    });

    it('Teste caso de falha de excluir quando o id exluido não existe', async () => {
      const { status, body } = await request(app)
      .delete('/workspace/notfound')
      .set('Authorization', token);

      expect(status).toBe(404);
      expect(body.error.message).toBe('Workspace not found');
    });
  });
});
