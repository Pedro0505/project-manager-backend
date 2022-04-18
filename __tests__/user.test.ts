import request from 'supertest';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import app from '../src/app';
import prisma from '../src/prisma';
import { verifyUuid } from './utils';
import * as fakeData from './fakeData';
import * as seeds from './seeds';
import { IUser } from '../src/interfaces/prisma';
import { IUserRegister } from '../src/interfaces/routes';

describe('Testes em /user', () => {
  describe('POST /user/register', () => {
    beforeAll(async () => {
      await prisma.user.create({ data: await seeds.matheus() });
    });

    afterAll(async () => {
      await prisma.user.deleteMany();

      await prisma.$disconnect();
    });

    it('quando o usuário é cadastrado com sucesso', async () => {
      const { status, body } = await request(app)
        .post('/user/register')
        .send(fakeData.user.register.request);
      const { id, email, firstName, lastName } = body.data as IUserRegister;

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
      invalidBody<IUser, string | number>({
        field: 'firstName',
        baseBody: fakeData.user.register.request,
        verb: 'post',
        endpoint: '/user/register',
        assertions: [
          { title: 'como um número', errorMessage: 'must be a string', bodyOverlaod: 2 },
          {
            title: 'com menos de 3 caracters',
            errorMessage: 'is at least 3 characters long',
            bodyOverlaod: 'ab',
          },
          {
            title: 'com mais de 60 caracters',
            errorMessage: 'is up to 60 characters long',
            bodyOverlaod: 'a'.repeat(61),
          },
          { title: 'não foi enviado', errorMessage: 'is required', bodyOverlaod: undefined },
        ],
      });

      invalidBody<IUser, string | number>({
        field: 'lastName',
        baseBody: fakeData.user.register.request,
        verb: 'post',
        endpoint: '/user/register',
        assertions: [
          { title: 'como um número', errorMessage: 'must be a string', bodyOverlaod: 2 },
          {
            title: 'com menos de 3 caracters',
            errorMessage: 'is at least 3 characters long',
            bodyOverlaod: 'ab',
          },
          {
            title: 'com mais de 60 caracters',
            errorMessage: 'is up to 60 characters long',
            bodyOverlaod: 'a'.repeat(61),
          },
          { title: 'não foi enviado', errorMessage: 'is required', bodyOverlaod: undefined },
        ],
      });

      invalidBody<IUser, string | number>({
        field: 'email',
        baseBody: fakeData.user.register.request,
        verb: 'post',
        endpoint: '/user/register',
        assertions: [
          { title: 'como um número', errorMessage: 'must be a string', bodyOverlaod: 2 },
          {
            title: 'é de um formato inválido',
            errorMessage: 'must be a valid email',
            bodyOverlaod: 'a@.co',
          },
          { title: 'não foi enviado', errorMessage: 'is required', bodyOverlaod: undefined },
        ],
      });

      invalidBody<IUser, string | number>({
        field: 'password',
        baseBody: fakeData.user.register.request,
        verb: 'post',
        endpoint: '/user/register',
        assertions: [
          { title: 'como um número', errorMessage: 'must be a string', bodyOverlaod: 2 },
          {
            title: 'com menos de 6 caracters',
            errorMessage: 'is at least 6 characters long',
            bodyOverlaod: 'abcde',
          },
          {
            title: 'com mais de 20 caracters',
            errorMessage: 'is up to 20 characters long',
            bodyOverlaod: 'a'.repeat(21),
          },
          { title: 'não foi enviado', errorMessage: 'is required', bodyOverlaod: undefined },
        ],
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
      await prisma.user.create({ data: await seeds.matheus() });
    });

    afterAll(async () => {
      await prisma.user.deleteMany();

      await prisma.$disconnect();
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
      invalidBody<IUser, string | number>({
        field: 'email',
        baseBody: fakeData.user.login.request,
        verb: 'post',
        endpoint: '/user/login',
        assertions: [
          { title: 'como um número', errorMessage: 'must be a string', bodyOverlaod: 2 },
          {
            title: 'é de um formato inválido',
            errorMessage: 'must be a valid email',
            bodyOverlaod: 'a@.co',
          },
          { title: 'não foi enviado', errorMessage: 'is required', bodyOverlaod: undefined },
        ],
      });

      invalidBody<IUser, string | number>({
        field: 'password',
        baseBody: fakeData.user.login.request,
        verb: 'post',
        endpoint: '/user/login',
        assertions: [
          { title: 'como um número', errorMessage: 'must be a string', bodyOverlaod: 2 },
          {
            title: 'com menos de 6 caracters',
            errorMessage: 'is at least 6 characters long',
            bodyOverlaod: 'abcde',
          },
          {
            title: 'com mais de 20 caracters',
            errorMessage: 'is up to 20 characters long',
            bodyOverlaod: 'a'.repeat(21),
          },
          { title: 'não foi enviado', errorMessage: 'is required', bodyOverlaod: undefined },
        ],
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
});
