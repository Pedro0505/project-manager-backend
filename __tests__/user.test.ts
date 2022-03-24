import request from 'supertest';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import app from '../src/app';
import { IUser, IUserSafe } from '../src/interfaces/prisma';

const userMock: IUser = {
  email: 'simpsoon@gmail.com',
  firstName: 'Homer',
  lastName: 'Simpson',
  password: 'alishdahsid',
};

const userResponseMock: IUserSafe = {
  email: 'simpsoon@gmail.com',
  firstName: 'Homer',
  lastName: 'Simpson',
};

describe('Testes', () => {
  it('Primeiro teste', async () => {
    const { status, body } = await request(app).post('/user/register').send(userMock);

    expect(status).toBe(201);
    expect(body.data).toStrictEqual(userResponseMock);
    expect(() => {
      jwt.verify(body.token, process.env.JWT_SECRET as string);
    }).not.toThrow();
  });
});
