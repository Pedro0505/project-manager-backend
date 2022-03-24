import request from 'supertest';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import app from '../src/app';
import prisma from '../src/prisma';
import * as fakeData from './fakeData';
import { invalidBody } from './commonTests';
import { IUser } from '../src/interfaces/prisma';

describe('Testes em /user', () => {
  beforeAll(async () => {
    await prisma.user.create({ data: fakeData.userRegister.requestConflictMock });
  });

  afterAll(async () => {
    await prisma.user.deleteMany();

    await prisma.$disconnect();
  });

  describe.only('POST /user/register', () => {
    it('quando o usuário é cadastrado com sucesso', async () => {
      const { status, body } = await request(app)
        .post('/user/register')
        .send(fakeData.userRegister.requestMock);

      expect(status).toBe(201);
      expect(body.data).toStrictEqual(fakeData.userRegister.responseMock);
      expect(() => {
        jwt.verify(body.token, process.env.JWT_SECRET as string);
      }).not.toThrow();
    });

    describe('quando o body é inválido', () => {
      invalidBody<IUser, string | number>({
        field: 'firstName',
        baseBody: fakeData.userRegister.requestMock,
        verb: 'post',
        endpoint: '/user/register',
        assertions: [
          { title: 'como um número', errorMessage: 'must be a string', bodyOverlaod: 2 },
          { title: 'com menos de 3 caracters', errorMessage: 'is at least 3 characters long', bodyOverlaod: 'ab' },
          { title: 'com mais de 60 caracters', errorMessage: 'is up to 60 characters long', bodyOverlaod: 'a'.repeat(61) },
          { title: 'não foi enviado', errorMessage: 'is required', bodyOverlaod: undefined },
        ],
      });

      invalidBody<IUser, string | number>({
        field: 'lastName',
        baseBody: fakeData.userRegister.requestMock,
        verb: 'post',
        endpoint: '/user/register',
        assertions: [
          { title: 'como um número', errorMessage: 'must be a string', bodyOverlaod: 2 },
          { title: 'com menos de 3 caracters', errorMessage: 'is at least 3 characters long', bodyOverlaod: 'ab' },
          { title: 'com mais de 60 caracters', errorMessage: 'is up to 60 characters long', bodyOverlaod: 'a'.repeat(61) },
          { title: 'não foi enviado', errorMessage: 'is required', bodyOverlaod: undefined },
        ],
      });

      invalidBody<IUser, string | number>({
        field: 'email',
        baseBody: fakeData.userRegister.requestMock,
        verb: 'post',
        endpoint: '/user/register',
        assertions: [
          { title: 'como um número', errorMessage: 'must be a string', bodyOverlaod: 2 },
          { title: 'é de um formato inválido', errorMessage: 'must be a valid email', bodyOverlaod: 'a@.co' },
          { title: 'não foi enviado', errorMessage: 'is required', bodyOverlaod: undefined },
        ],
      });

      invalidBody<IUser, string | number>({
        field: 'password',
        baseBody: fakeData.userRegister.requestMock,
        verb: 'post',
        endpoint: '/user/register',
        assertions: [
          { title: 'como um número', errorMessage: 'must be a string', bodyOverlaod: 2 },
          { title: 'com menos de 6 caracters', errorMessage: 'is at least 6 characters long', bodyOverlaod: 'abcde' },
          { title: 'com mais de 20 caracters', errorMessage: 'is up to 20 characters long', bodyOverlaod: 'a'.repeat(21) },
          { title: 'não foi enviado', errorMessage: 'is required', bodyOverlaod: undefined },
        ],
      });
    });

    it('quando o email já está cadastrado', async () => {
      const { status, body } = await request(app)
        .post('/user/register')
        .send(fakeData.userRegister.requestConflictMock);

      expect(status).toBe(409);
      expect(body.error).toBeDefined();
      expect(body.error.message).toMatch('email already registered');
    });
  });

  describe('POST /user/login', () => {
    it('quando o login é feito com sucesso', async () => {
      const { status, body } = await request(app)
        .post('/user/login')
        .send(fakeData.userLogin.requestMock);

      expect(status).toBe(200);
      expect(() => {
        jwt.verify(body.token, process.env.JWT_SECRET as string);
      }).not.toThrow();
    });
  });
});
