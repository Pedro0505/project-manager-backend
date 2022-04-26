import request from 'supertest';
import app from '../../src/app';
import prisma from '../../src/prisma';
import * as fakeData from '../fakeData';
import * as seeds from '../seeds';
import { verifyUuid } from '../utils';

describe('Testes em /column', () => {
  describe('POST /column', () => {
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
});
