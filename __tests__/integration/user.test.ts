import request from 'supertest';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import app from '../../src/app';
import prisma from '../../src/database/prisma';
import { verifyUuid } from '../utils';
import * as fakeData from '../fakeData';
import * as seeds from '../seeds';

describe('Testes em /user', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('POST /user/register', () => {
    beforeAll(async () => {
      await prisma.user.create({ data: seeds.matheus });
    });

    afterAll(async () => {
      await prisma.user.deleteMany();
    });

    it('quando o usuário é cadastrado com sucesso', async () => {
      const { status, body } = await request(app)
        .post('/user/register')
        .send(fakeData.user.register.request);
      const { id, email, firstName, lastName } = body.data;

      expect(status).toBe(201);
      expect(verifyUuid(id)).toBeTruthy();
      expect(email).toBe(fakeData.user.register.response.email);
      expect(firstName).toBe(fakeData.user.register.response.firstName);
      expect(lastName).toBe(fakeData.user.register.response.lastName);
      expect(() => {
        jwt.verify(body.token, process.env.JWT_SECRET);
      }).not.toThrow();
    });

    describe('quando o body é inválido', () => {
      it('"firstName" não foi enviado', async () => {
        const { status, body } = await request(app)
          .post('/user/register')
          .send({ ...fakeData.user.register.request, firstName: undefined });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"firstName" is required');
      });

      it('"firstName" como um número', async () => {
        const { status, body } = await request(app)
          .post('/user/register')
          .send({ ...fakeData.user.register.request, firstName: 2 });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"firstName" must be a string');
      });

      it('"firstName" com menos de 3 caracters', async () => {
        const { status, body } = await request(app)
          .post('/user/register')
          .send({ ...fakeData.user.register.request, firstName: 'ab' });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"firstName" is at least 3 characters long');
      });

      it('"firstName" com mais de 60 caracters', async () => {
        const { status, body } = await request(app)
          .post('/user/register')
          .send({ ...fakeData.user.register.request, firstName: 'a'.repeat(61) });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"firstName" is up to 60 characters long');
      });

      it('"lastName" não foi enviado', async () => {
        const { status, body } = await request(app)
          .post('/user/register')
          .send({ ...fakeData.user.register.request, lastName: undefined });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"lastName" is required');
      });

      it('"lastName" como um número', async () => {
        const { status, body } = await request(app)
          .post('/user/register')
          .send({ ...fakeData.user.register.request, lastName: 2 });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"lastName" must be a string');
      });

      it('"lastName" com menos de 3 caracters', async () => {
        const { status, body } = await request(app)
          .post('/user/register')
          .send({ ...fakeData.user.register.request, lastName: 'ab' });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"lastName" is at least 3 characters long');
      });

      it('"lastName" com mais de 60 caracters', async () => {
        const { status, body } = await request(app)
          .post('/user/register')
          .send({ ...fakeData.user.register.request, lastName: 'a'.repeat(61) });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"lastName" is up to 60 characters long');
      });

      it('"email" não foi enviado', async () => {
        const { status, body } = await request(app)
          .post('/user/register')
          .send({ ...fakeData.user.register.request, email: undefined });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"email" is required');
      });

      it('"email" como um número', async () => {
        const { status, body } = await request(app)
          .post('/user/register')
          .send({ ...fakeData.user.register.request, email: 2 });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"email" must be a string');
      });

      it('"email" é de um formato inválido', async () => {
        const { status, body } = await request(app)
          .post('/user/register')
          .send({ ...fakeData.user.register.request, email: 'a@.co' });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"email" must be a valid email');
      });

      it('"password" não foi enviado', async () => {
        const { status, body } = await request(app)
          .post('/user/register')
          .send({ ...fakeData.user.register.request, password: undefined });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"password" is required');
      });

      it('"password" como um número', async () => {
        const { status, body } = await request(app)
          .post('/user/register')
          .send({ ...fakeData.user.register.request, password: 2 });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"password" must be a string');
      });

      it('"password" com menos de 6 caracters', async () => {
        const { status, body } = await request(app)
          .post('/user/register')
          .send({ ...fakeData.user.register.request, password: 'abcde' });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"password" is at least 6 characters long');
      });

      it('"password" com mais de 20 caracters', async () => {
        const { status, body } = await request(app)
          .post('/user/register')
          .send({ ...fakeData.user.register.request, password: 'a'.repeat(21) });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"password" is up to 20 characters long');
      });
    });

    it('quando o email já está cadastrado', async () => {
      const { status, body } = await request(app)
        .post('/user/register')
        .send(fakeData.user.register.requestConflict);

      expect(status).toBe(409);
      expect(body.error).toBeDefined();
      expect(body.error.message).toMatch('email already registered');
    });
  });

  describe('POST /user/login', () => {
    beforeAll(async () => {
      await prisma.user.create({ data: seeds.matheus });
    });

    afterAll(async () => {
      await prisma.user.deleteMany();
    });

    it('quando o login é feito com sucesso', async () => {
      const { status, body } = await request(app)
        .post('/user/login')
        .send(fakeData.user.login.request);

      expect(status).toBe(200);
      expect(() => {
        jwt.verify(body.token, process.env.JWT_SECRET);
      }).not.toThrow();
    });

    describe('quando o body é inválido', () => {
      it('"email" não foi enviado', async () => {
        const { status, body } = await request(app)
          .post('/user/login')
          .send({ ...fakeData.user.login.request, email: undefined });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"email" is required');
      });

      it('"email" como um número', async () => {
        const { status, body } = await request(app)
          .post('/user/login')
          .send({ ...fakeData.user.login.request, email: 2 });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"email" must be a string');
      });

      it('"email" é de um formato inválido', async () => {
        const { status, body } = await request(app)
          .post('/user/login')
          .send({ ...fakeData.user.login.request, email: 'a@.co' });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"email" must be a valid email');
      });

      it('"password" não foi enviado', async () => {
        const { status, body } = await request(app)
          .post('/user/login')
          .send({ ...fakeData.user.login.request, password: undefined });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"password" is required');
      });

      it('"password" como um número', async () => {
        const { status, body } = await request(app)
          .post('/user/login')
          .send({ ...fakeData.user.login.request, password: 2 });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"password" must be a string');
      });

      it('"password" com menos de 6 caracters', async () => {
        const { status, body } = await request(app)
          .post('/user/login')
          .send({ ...fakeData.user.login.request, password: 'abcde' });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"password" is at least 6 characters long');
      });

      it('"password" com mais de 20 caracters', async () => {
        const { status, body } = await request(app)
          .post('/user/login')
          .send({ ...fakeData.user.login.request, password: 'a'.repeat(21) });

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toMatch('"password" is up to 20 characters long');
      });
    });

    it('quando o email não está cadastrado', async () => {
      const { status, body } = await request(app)
        .post('/user/login')
        .send(fakeData.user.login.requestUnregisteredEmail);

      expect(status).toBe(404);
      expect(body.error).toBeDefined();
      expect(body.error.message).toMatch('email not found');
    });

    it('quando a senha está inválida', async () => {
      const { status, body } = await request(app)
        .post('/user/login')
        .send(fakeData.user.login.requestWrongPassword);

      expect(status).toBe(401);
      expect(body.error).toBeDefined();
      expect(body.error.message).toMatch('wrong password');
    });
  });
  describe('GET /user/search', () => {
    beforeAll(async () => {
      await prisma.user.create({ data: seeds.matheus });
    });

    afterAll(async () => {
      await prisma.user.deleteMany();
    });

    it('Testando caso de sucesso da busca por email', async () => {
      const { status, body } = await request(app)
      .get('/user/search?q=matheus@gmail.com')

      expect(status).toBe(200);
      expect(body).toStrictEqual(seeds.matheus);
    });
    it('Testando caso de falha da busca por email', async () => {
      const { status, body } = await request(app)
      .get('/user/search?q=random@email.com')

      expect(status).toBe(404);
      expect(body.error.message).toStrictEqual('User Not Found');
    });
  });
});
