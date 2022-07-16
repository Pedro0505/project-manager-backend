import request from 'supertest';
import app from '../../src/app';
import prisma from '../../src/database/prisma';
import * as fakeData from '../fakeData/integration';
import * as seeds from '../seeds';
import { verifyUuid } from '../utils';

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
      expect(body.data.name).toBe(fakeData.workspace.create.response.name);
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

  describe('DELETE /workspace', () => {
    let token: string;
    let otherUserToken: string;

    beforeAll(async () => {
      await prisma.$transaction([
        prisma.user.createMany({ data: [seeds.matheus, seeds.pedro] }),
        prisma.workspace.createMany({ data: seeds.allWorkspaces }),
      ]);

      const { body } = await request(app).post('/user/login').send(fakeData.user.login.request);
      token = body.token;

      const { body: secondToken } = await request(app).post('/user/login').send({ email: 'pedro@gmail.com', password: '12345678' });
      otherUserToken = secondToken.token;
    });

    afterAll(async () => {
      await prisma.$transaction([prisma.workspace.deleteMany(), prisma.user.deleteMany()]);

      await prisma.$disconnect();
    });

    it('Teste caso de excluir quando a operação é feita pela pessoa que não é dona do workspace', async () => {
      const { status, body } = await request(app)
        .delete('/workspace/b92b2836-1ee9-4621-81a4-906a7a80dec9')
        .set('Authorization', otherUserToken);

      expect(status).toBe(401);
      expect(body.error.message).toBeDefined();
      expect(body.error.message).toBe('operation not allowed');
    });

    it('Teste caso de sucesso de excluir', async () => {
      const { status: statusFirstTime } = await request(app)
        .delete('/workspace/b92b2836-1ee9-4621-81a4-906a7a80dec9')
        .set('Authorization', token);

      const { status: statusSecondTime, body } = await request(app)
        .delete('/workspace/b92b2836-1ee9-4621-81a4-906a7a80dec9')
        .set('Authorization', token);

      expect(statusFirstTime).toBe(204);
      expect(statusSecondTime).toBe(404);
      expect(body.error.message).toBe('workspace not found');
    });

    it('Teste caso de falha de excluir quando o id exluido não existe', async () => {
      const { status, body } = await request(app)
        .delete('/workspace/notfound')
        .set('Authorization', token);

      expect(status).toBe(404);
      expect(body.error.message).toBe('workspace not found');
    });
  });

  describe('GET /workspace', () => {
    let token: string;

    beforeAll(async () => {
      await prisma.$transaction([
        prisma.user.createMany({ data: [seeds.matheus, seeds.pedro] }),
        prisma.workspace.createMany({ data: seeds.allWorkspaces }),
        prisma.workspaceColumn.createMany({ data: seeds.allWorkspaceColumns }),
        prisma.workspaceCard.createMany({ data: seeds.allWorkspaceCards }),
      ]);

      const { body } = await request(app).post('/user/login').send(fakeData.user.login.request);
      token = body.token;
    });

    afterAll(async () => {
      await prisma.$transaction([prisma.workspace.deleteMany(), prisma.user.deleteMany(), prisma.workspaceCard.deleteMany(), prisma.workspaceColumn.deleteMany()]);

      await prisma.$disconnect();
    });

    it('Caso de sucesso do getAll workspace', async () => {
      const { body, status } = await request(app)
        .get('/workspace')
        .set('Authorization', token);

      expect(status).toBe(200);
      expect(body.data).toBeDefined();
      expect(body.data).toStrictEqual(fakeData.workspace.getAll.response);
    });
  });

  describe('GET /workspace/:id', () => {
    let token: string;
    let otherUserToken: string;

    beforeAll(async () => {
      await prisma.$transaction([
        prisma.user.createMany({ data: [seeds.matheus, seeds.pedro] }),
        prisma.workspace.createMany({ data: seeds.allWorkspaces }),
      ]);

      const { body } = await request(app).post('/user/login').send(fakeData.user.login.request);
      token = body.token;

      const { body: secondToken } = await request(app).post('/user/login').send({ email: 'pedro@gmail.com', password: '12345678' });
      otherUserToken = secondToken.token;
    });

    afterAll(async () => {
      await prisma.$transaction([prisma.workspace.deleteMany(), prisma.user.deleteMany()]);

      await prisma.$disconnect();
    });

    it('Caso de sucesso do getById workspace sem columns', async () => {
      const { body, status } = await request(app)
        .get('/workspace/b92b2836-1ee9-4621-81a4-906a7a80dec9')
        .set('Authorization', token);

      expect(status).toBe(200);
      expect(body.data).toBeDefined();
      expect(body.data).toStrictEqual(fakeData.workspace.getById.response);
    });

    it('Caso de falha do getById workspace quando o workspace não é encontrado', async () => {
      const { body, status } = await request(app)
        .get('/workspace/sssssdasdasdasdas')
        .set('Authorization', token);

      expect(status).toBe(404);
      expect(body.error.message).toBeDefined();
      expect(body.error.message).toBe('workspace not found');
    });

    it('Caso de falha do getById workspace quando o usuario não tem permissão para acessar o workspace', async () => {
      const { body, status } = await request(app)
        .get('/workspace/b92b2836-1ee9-4621-81a4-906a7a80dec9')
        .set('Authorization', otherUserToken);

      expect(status).toBe(401);
      expect(body.error.message).toBeDefined();
      expect(body.error.message).toBe('operation not allowed');
    });
  });

  describe('GET /workspace/:id?includeColumns=true', () => {
    let token: string;
    let otherUserToken: string;

    beforeAll(async () => {
      await prisma.$transaction([
        prisma.user.createMany({ data: [seeds.matheus, seeds.pedro] }),
        prisma.workspace.createMany({ data: seeds.allWorkspaces }),
        prisma.workspaceColumn.createMany({ data: seeds.allWorkspaceColumns }),
        prisma.workspaceCard.createMany({ data: seeds.allWorkspaceCards }),
      ]);

      const { body } = await request(app).post('/user/login').send(fakeData.user.login.request);
      token = body.token;

      const { body: secondToken } = await request(app).post('/user/login').send({ email: 'pedro@gmail.com', password: '12345678' });
      otherUserToken = secondToken.token;
    });

    afterAll(async () => {
      await prisma.$transaction([prisma.workspace.deleteMany(), prisma.user.deleteMany(), prisma.workspaceCard.deleteMany(), prisma.workspaceColumn.deleteMany()]);

      await prisma.$disconnect();
    });

    it('Caso de sucesso do getWithColumn workspace com columns e cards', async () => {
      const { body, status } = await request(app)
        .get('/workspace/b92b2836-1ee9-4621-81a4-906a7a80dec9?includeColumns=true')
        .set('Authorization', token);

      expect(status).toBe(200);
      expect(body.data).toBeDefined();
      expect(body.data).toStrictEqual(fakeData.workspace.getWithColumns.response);
    });

    it('Caso de falha do getWithColumn workspace quando o workspace não é encontrado', async () => {
      const { body, status } = await request(app)
        .get('/workspace/sssssdasdasdasdas?includeColumns=true')
        .set('Authorization', token);

      expect(status).toBe(404);
      expect(body.error.message).toBeDefined();
      expect(body.error.message).toBe('workspace not found');
    });

    it('Caso de falha do getWithColumn workspace quando o usuario não tem permissão para acessar o workspace', async () => {
      const { body, status } = await request(app)
        .get('/workspace/b92b2836-1ee9-4621-81a4-906a7a80dec9?includeColumns=true')
        .set('Authorization', otherUserToken);

      expect(status).toBe(401);
      expect(body.error.message).toBeDefined();
      expect(body.error.message).toBe('operation not allowed');
    });
  });

  describe('PATCH /workspace', () => {
    let token: string;
    let otherUserToken: string;

    beforeAll(async () => {
      await prisma.$transaction([
        prisma.user.createMany({ data: [seeds.matheus, seeds.pedro] }),
        prisma.workspace.createMany({ data: seeds.allWorkspaces }),
      ]);

      const { body } = await request(app).post('/user/login').send(fakeData.user.login.request);
      token = body.token;

      const { body: secondToken } = await request(app).post('/user/login').send({ email: 'pedro@gmail.com', password: '12345678' });
      otherUserToken = secondToken.token;
    });

    afterAll(async () => {
      await prisma.$transaction([prisma.workspace.deleteMany(), prisma.user.deleteMany()]);

      await prisma.$disconnect();
    });

    it('Quando o workspace tem seu nome atualizado com sucesso', async () => {
      const { body, status } = await request(app)
        .patch('/workspace/b92b2836-1ee9-4621-81a4-906a7a80dec9')
        .send(fakeData.workspace.patchName.request)
        .set('Authorization', token);

      expect(body.data).toBeDefined();
      expect(body.data).toStrictEqual(fakeData.workspace.patchName.response);
      expect(status).toBe(200);
    });

    it('Caso de falha do patch do workspaceName quando o usuario não tem permissão para alterar o workspace', async () => {
      const { body, status } = await request(app)
        .patch('/workspace/b92b2836-1ee9-4621-81a4-906a7a80dec9')
        .send(fakeData.workspace.patchName.request)
        .set('Authorization', otherUserToken);

      expect(status).toBe(401);
      expect(body.error.message).toBeDefined();
      expect(body.error.message).toBe('operation not allowed');
    });

    it('Quando o workspace não é encontrado', async () => {
      const { body, status } = await request(app)
        .patch('/workspace/notExistWorkspace')
        .send(fakeData.workspace.patchName.request)
        .set('Authorization', otherUserToken);

      expect(status).toBe(404);
      expect(body.error.message).toBeDefined();
      expect(body.error.message).toBe('workspace not found');
    });
  });
});
