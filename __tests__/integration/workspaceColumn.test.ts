import request from 'supertest';
import app from '../../src/app';
import prisma from '../../src/database/prisma';
import * as fakeData from '../fakeData';
import * as seeds from '../seeds';
import { verifyUuid } from '../utils';

describe('Testes em /column', () => {
  describe('POST /column', () => {
    let token: string;
    let otherUserToken: string;

    beforeAll(async () => {
      await prisma.$transaction([
        prisma.user.createMany({ data: [seeds.matheus, seeds.pedro] }),
        prisma.workspace.createMany({ data: seeds.allWorkspaces }),
        prisma.workspaceColumn.createMany({ data: seeds.allWorkspaceColumns }),
      ]);

      const { body } = await request(app).post('/user/login').send(fakeData.user.login.request);
      token = body.token;

      const { body: secondToken } = await request(app).post('/user/login').send({ email: 'pedro@gmail.com', password: '12345678' });
      otherUserToken = secondToken.token;
    });

    afterAll(async () => {
      await prisma.$transaction([
        prisma.workspaceColumn.deleteMany(),
        prisma.workspace.deleteMany(),
        prisma.user.deleteMany(),
      ]);

      await prisma.$disconnect();
    });

    it('quando o workspaceColumn é criado com sucesso', async () => {
      const { status, body } = await request(app)
        .post('/column')
        .set('Authorization', token)
        .send(fakeData.workspaceColumn.create.request);

      expect(status).toBe(201);
      expect(verifyUuid(body.data.id)).toBe(true);
      expect({
        title: body.data.title,
        workspaceId: body.data.workspaceId,
        index: body.data.index,
      }).toStrictEqual(fakeData.workspaceColumn.create.response);
    });

    it('Teste caso de criar quando a operação é feita pela pessoa que não é dona do workspaceColumn', async () => {
      const { status, body } = await request(app)
        .post('/column')
        .set('Authorization', otherUserToken)
        .send(fakeData.workspaceColumn.create.request);

      expect(status).toBe(401);
      expect(body.error.message).toBeDefined();
      expect(body.error.message).toBe('operation not allowed');
    });

    describe('quando o body do workspace é invalido', () => {
      it('"workspaceId" não foi enviado', async () => {
        const { status, body } = await request(app)
          .post('/column')
          .set('Authorization', token)
          .send({ ...fakeData.workspaceColumn.create.request, workspaceId: undefined });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"workspaceId" is required');
      });

      it('"workspaceId" como um number', async () => {
        const { status, body } = await request(app)
          .post('/column')
          .set('Authorization', token)
          .send({ ...fakeData.workspaceColumn.create.request, workspaceId: 2 });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"workspaceId" must be a string');
      });

      it('"title" não foi enviado', async () => {
        const { status, body } = await request(app)
          .post('/column')
          .set('Authorization', token)
          .send({ ...fakeData.workspaceColumn.create.request, title: undefined });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"title" is required');
      });

      it('"title" como um number', async () => {
        const { status, body } = await request(app)
          .post('/column')
          .set('Authorization', token)
          .send({ ...fakeData.workspaceColumn.create.request, title: 2 });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"title" must be a string');
      });
    });

    describe('quando o auth da problema', () => {
      it('token não enviado', async () => {
        const { status, body } = await request(app)
          .post('/column')
          .send(fakeData.workspaceColumn.create.request);

        expect(status).toBe(401);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('token not found');
      });

      it('token inválido', async () => {
        const { status, body } = await request(app)
          .post('/column')
          .set('Authorization', 'matheuspedroprojectmanager')
          .send(fakeData.workspaceColumn.create.request);

        expect(status).toBe(401);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('expired or invalid token');
      });
    });
  });

  describe('DELETE /column', () => {
    let token: string;

    beforeAll(async () => {
      await prisma.$transaction([
        prisma.user.createMany({ data: [seeds.matheus, seeds.pedro] }),
        prisma.workspace.createMany({ data: seeds.allWorkspaces }),
        prisma.workspaceColumn.createMany({ data: seeds.allWorkspaceColumns }),
      ]);

      const { body } = await request(app).post('/user/login').send(fakeData.user.login.request);
      token = body.token;
    });

    afterAll(async () => {
      await prisma.$transaction([
        prisma.workspaceColumn.deleteMany(),
        prisma.workspace.deleteMany(),
        prisma.user.deleteMany(),
      ]);

      await prisma.$disconnect();
    });

    it('Testando caso de sucesso do delete', async () => {
      const { status: statusFirstTime } = await request(app)
      .delete('/column/67b97db2-0f7a-4f2a-b515-9d7054f94a32')
      .set('Authorization', token);

      const { status: statusSecondTime, body } = await request(app)
      .delete('/column/67b97db2-0f7a-4f2a-b515-9d7054f94a32')
      .set('Authorization', token);

      expect(statusFirstTime).toBe(204);
      expect(statusSecondTime).toBe(404);
      expect(body.error.message).toBe('Column not found');
    });

    it('Teste caso de falha de excluir quando o id exluido não existe', async () => {
      const { status, body } = await request(app)
      .delete('/column/notfound')
      .set('Authorization', token);

      expect(status).toBe(404);
      expect(body.error.message).toBe('Column not found');
    });
  });

  describe('PUT /column', () => {
    let token: string;

    beforeAll(async () => {
      await prisma.$transaction([
        prisma.user.createMany({ data: [seeds.matheus, seeds.pedro] }),
        prisma.workspace.createMany({ data: seeds.allWorkspaces }),
        prisma.workspaceColumn.createMany({ data: seeds.allWorkspaceColumns }),
      ]);

      const { body } = await request(app).post('/user/login').send(fakeData.user.login.request);
      token = body.token;
    });

    afterAll(async () => {
      await prisma.$transaction([
        prisma.workspaceColumn.deleteMany(),
        prisma.workspace.deleteMany(),
        prisma.user.deleteMany(),
      ]);

      await prisma.$disconnect();
    });

    it('Caso de sucesso do update', async () => {
      const { body, status } = await request(app)
      .put('/column/67b97db2-0f7a-4f2a-b515-9d7054f94a32')
      .send(fakeData.workspaceColumn.put.request) 
      .set('Authorization', token);

      const updateDB = await prisma.workspaceColumn.findUnique({ where: { id: '67b97db2-0f7a-4f2a-b515-9d7054f94a32' } });

      expect(status).toBe(200);
      expect(body.data).toBeDefined();
      expect(body.data).toStrictEqual(fakeData.workspaceColumn.put.response);
      expect(updateDB).toStrictEqual(fakeData.workspaceColumn.put.response);
    });

    it('Caso de falha do update quando o id não é encontrado', async () => {
      const { body, status } = await request(app)
      .put('/column/6gferetg')
      .send(fakeData.workspaceColumn.put.request) 
      .set('Authorization', token);

      expect(status).toBe(404);
      expect(body.error.message).toBe('Column not found');
    });
  })

  describe('PATCH /column', () => {
    let token: string;

    beforeAll(async () => {
      await prisma.$transaction([
        prisma.user.createMany({ data: [seeds.matheus, seeds.pedro] }),
        prisma.workspace.createMany({ data: seeds.allWorkspaces }),
        prisma.workspaceColumn.createMany({ data: seeds.allWorkspaceColumns }),
      ]);

      const { body } = await request(app).post('/user/login').send(fakeData.user.login.request);
      token = body.token;
    });

    afterAll(async () => {
      await prisma.$transaction([
        prisma.workspaceColumn.deleteMany(),
        prisma.workspace.deleteMany(),
        prisma.user.deleteMany(),
      ]);

      await prisma.$disconnect();
    });

    it('Caso de sucesso do updateMany', async () => {
      const { body, status } = await request(app)
      .patch('/column')
      .send(fakeData.workspaceColumn.manyUpdate.request)
      .set('Authorization', token);

      expect(status).toBe(200);
      expect(body.data).toBeDefined();
      expect(body.data).toStrictEqual(fakeData.workspaceColumn.manyUpdate.response);
    })
  })
});
