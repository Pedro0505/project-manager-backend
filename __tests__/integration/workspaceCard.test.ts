import request from 'supertest';
import app from '../../src/app';
import prisma from '../../src/database/prisma';
import * as fakeData from '../fakeData';
import * as seeds from '../seeds';
import { verifyUuid } from '../utils';

describe('Testes em /card', () => {
  describe('POST /card', () => {
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
      await prisma.$transaction([
        prisma.workspaceCard.deleteMany(),
        prisma.workspaceColumn.deleteMany(),
        prisma.workspace.deleteMany(),
        prisma.user.deleteMany(),
      ]);

      await prisma.$disconnect();
    });

    it('quando o workspaceCard é criado com sucesso com uma coluna nova', async () => {
      const { body: { data: { id } } } = await request(app)
        .post('/column')
        .set('Authorization', token)
        .send({ title: 'Teste', workspaceId: 'b92b2836-1ee9-4621-81a4-906a7a80dec9' });

      const { body, status } = await request(app)
      .post('/card')
      .send({ content: 'Card Created', columnId: id })
      .set('Authorization', token);

      expect(status).toBe(201);
      expect(verifyUuid(body.data.id)).toBe(true);
      expect({ content: body.data.content, columnId: body.data.columnId, index: body.data.index,})
        .toStrictEqual({ content: 'Card Created', columnId: id, index: 0 });
    });


    it('quando o workspaceCard é criado com sucesso com uma coluna que já existe', async () => {
      const { body, status } = await request(app)
      .post('/card')
      .send(fakeData.workspaceCard.create.request)
      .set('Authorization', token);

      expect(status).toBe(201);
      expect(verifyUuid(body.data.id)).toBe(true);
      expect({ content: body.data.content, columnId: body.data.columnId, index: body.data.index,})
        .toStrictEqual(fakeData.workspaceCard.create.response);
    });

    it('Teste caso de criar quando a operação é feita pela pessoa que não é dona do workspace', async () => {
      const { status, body } = await request(app)
      .post('/card')
      .send(fakeData.workspaceCard.create.request)
      .set('Authorization', otherUserToken);

      expect(status).toBe(401);
      expect(body.error.message).toBeDefined();
      expect(body.error.message).toBe('operation not allowed');
    });

    describe('quando o body do workspaceCard é invalido', () => {
      it('"columnId" não foi enviado', async () => {
        const { status, body } = await request(app)
          .post('/card')
          .send({ ...fakeData.workspaceCard.create.request, columnId: undefined })
          .set('Authorization', token);

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

  describe('DELETE /card/:id', () => {
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
      await prisma.$transaction([
        prisma.workspaceCard.deleteMany(),
        prisma.workspaceColumn.deleteMany(),
        prisma.workspace.deleteMany(),
        prisma.user.deleteMany(),
      ]);

      await prisma.$disconnect();
    });

    it('Teste caso de criar quando a operação é feita pela pessoa que não é dona do workspace', async () => {
      const { status, body } = await request(app)
      .delete('/card/1e2caa3a-a668-455b-bc1d-53909ac96933')
      .set('Authorization', otherUserToken);

      expect(status).toBe(401);
      expect(body.error.message).toBeDefined();
      expect(body.error.message).toBe('operation not allowed');
    });

    it('Caso de suceso de um exlude card', async () => {
      const { status: statusFirstTime } = await request(app)
      .delete('/card/1e2caa3a-a668-455b-bc1d-53909ac96933')
      .set('Authorization', token);

      const { status: statusSecondTime, body } = await request(app)
      .delete('/card/1e2caa3a-a668-455b-bc1d-53909ac96933')
      .set('Authorization', token);

      expect(statusFirstTime).toBe(204);
      expect(statusSecondTime).toBe(404);
      expect(body.error.message).toBe('Card not found');
    })

    it('Caso de falha de um exlude card quando o id não existe', async () => {
      const { status, body } = await request(app)
      .delete('/card/1e2caa3a-53909ac96933')
      .set('Authorization', token);

      expect(status).toBe(404);
      expect(body.error.message).toBe('Card not found');
    })
  });

  describe('PATCH /card/:id', () => {
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
      await prisma.$transaction([
        prisma.workspaceCard.deleteMany(),
        prisma.workspaceColumn.deleteMany(),
        prisma.workspace.deleteMany(),
        prisma.user.deleteMany(),
      ]);

      await prisma.$disconnect();
    });

    it('Teste caso de atualizar quando a operação é feita pela pessoa que não é dona do workspace', async () => {
      const { status, body } = await request(app)
      .patch('/card/1e2caa3a-a668-455b-bc1d-53909ac96933')
      .send(fakeData.workspaceCard.patch.request)
      .set('Authorization', otherUserToken);

      expect(status).toBe(401);
      expect(body.error.message).toBeDefined();
      expect(body.error.message).toBe('operation not allowed');
    });

    it('Caso de sucesso do update do card', async () => {
      const { body, status } = await request(app)
      .patch('/card/1e2caa3a-a668-455b-bc1d-53909ac96933')
      .send(fakeData.workspaceCard.patch.request)
      .set('Authorization', token);

      const updateDB = await prisma.workspaceCard.findUnique({ where: { id: '1e2caa3a-a668-455b-bc1d-53909ac96933' } });

      expect(status).toBe(200);
      expect(body.data).toBeDefined();
      expect(body.data).toStrictEqual(fakeData.workspaceCard.patch.response);
      expect(updateDB).toStrictEqual(fakeData.workspaceCard.patch.response);
    });

    it('Caso de falha do update do card quando o id do card não existe', async () => {
      const { body, status } = await request(app)
      .patch('/card/bc1dss')
      .send(fakeData.workspaceCard.patch.request)
      .set('Authorization', token);

      expect(status).toBe(404);
      expect(body.error.message).toBeDefined();
      expect(body.error.message).toBe('Card not found');
    });

    it('Caso de falha do update do card quando o column id não existe', async () => {
      const { body, status } = await request(app)
      .patch('/card/1e2caa3a-a668-455b-bc1d-53909ac96933')
      .send({ ...fakeData.workspaceCard.patch.request, columnId: 'osskdassdaks-s-sssss-sss' })
      .set('Authorization', token);

      expect(status).toBe(404);
      expect(body.error.message).toBeDefined();
      expect(body.error.message).toBe('Column not found');
    });
  });

  describe('PATCH /card', () => {
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
      await prisma.$transaction([
        prisma.workspaceCard.deleteMany(),
        prisma.workspaceColumn.deleteMany(),
        prisma.workspace.deleteMany(),
        prisma.user.deleteMany(),
      ]);

      await prisma.$disconnect();
    });

    it('Caso de sucesso do updateMany', async () => {
      const { body, status } = await request(app)
      .patch('/card')
      .send(fakeData.workspaceCard.patchMany.request)
      .set('Authorization', token);

      expect(status).toBe(200);
      expect(body.data).toBeDefined();
      expect(body.data).toStrictEqual(fakeData.workspaceCard.patchMany.response);
    });

    it('Teste caso de atualizar muitos quando a operação é feita pela pessoa que não é dona do workspace', async () => {
      const { status, body } = await request(app)
      .patch('/card')
      .send(fakeData.workspaceCard.patchMany.request)
      .set('Authorization', otherUserToken);

      expect(status).toBe(401);
      expect(body.error.message).toBeDefined();
      expect(body.error.message).toBe('operation not allowed');
    });

    it('Teste caso de atualizar muitos quando a operação é feita pela pessoa que não é dona de uma das colunas', async () => {
      const { status, body } = await request(app)
      .patch('/card')
      .send([
        { id: '1e2caa3a-a668-455b-bc1d-53909ac96933', columnId: '3bd3fc3b-7de3-4a8e-b54d-2588eeabae6d' },
        { id: 'fbbeef8d-99e3-49a1-895c-beb88592da53', columnId: '67b97db2-0f7a-4f2a-b515-9d7054f94a32' }
      ])
      .set('Authorization', token);

      expect(status).toBe(401);
      expect(body.error.message).toBeDefined();
      expect(body.error.message).toBe('operation not allowed');
    });

    it('Quando o card não é encontrado', async () => {
      const { body, status } = await request(app)
      .patch('/card')
      .send([
        { id: 'ewrwe-a668-qewrwe-bc1d-rwerwerew', columnId: '67b97db2-0f7a-4f2a-b515-9d7054f94a32' },
        { id: 'fbbeef8d-99e3-49a1-895c-beb88592da53', columnId: '67b97db2-0f7a-4f2a-b515-9d7054f94a32' }
      ]).set('Authorization', token);

      expect(status).toBe(404);
      expect(body.error.message).toBeDefined();
      expect(body.error.message).toBe('Card not found');
    });

    it('Quando o column não é encontrado', async () => {
      const { body, status } = await request(app)
      .patch('/card')
      .send([
        { id: '1e2caa3a-a668-455b-bc1d-53909ac96933', columnId: 'saddsa-dsadas-2123-dsadas-2131123123' },
        { id: 'fbbeef8d-99e3-49a1-895c-beb88592da53', columnId: '67b97db2-0f7a-4f2a-b515-9d7054f94a32' }
      ]).set('Authorization', token);

      expect(status).toBe(404);
      expect(body.error.message).toBeDefined();
      expect(body.error.message).toBe('Column not found');
    });
  });
});
