import request from 'supertest';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import app from '../src/app';
import prisma from '../src/prisma';
import * as fakeData from './fakeData';

describe('Testes em /user', () => {
  afterAll(async () => {
    await prisma.user.deleteMany();

    await prisma.$disconnect();
  });

  describe('POST /user/register', () => {
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

