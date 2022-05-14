import jwt from 'jsonwebtoken';
import prisma from '../../../src/database/prisma';
import * as Service from '../../../src/entities/User/services';
import NotFoundError from '../../../src/helpers/NotFoundError';
import UnauthorizedError from '../../../src/helpers/UnauthorizedError';
import * as fakeData from '../../fakeData/unit';
import { IDecoded } from '../../interfaces/jwt';

describe('Teste User Service', () => {
  describe('Testando o service de login', () => {
    describe('Testando caso de sucesso do login', () => {
      beforeEach(() => {
        jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(fakeData.userService.login.mock);
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('Teste de caso de sucesso do login', async () => {
        const token = await Service.login(fakeData.userService.login.serviceParams);

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as IDecoded;

        expect(() => decoded).not.toThrow();
        expect(decoded.tokenData).toStrictEqual(fakeData.userService.login.jwtResponse);
      });
    });

    describe('Testando caso de error do login quando o usuario não é encontrado', () => {
      beforeEach(() => {
        jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('Teste de caso de error testando a menssagem ', async () => {
        try {
          await Service.login(fakeData.userService.loginUserNotFound.serviceParams);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundError);
          if (error instanceof NotFoundError) {
            expect(error.code).toBe(fakeData.userService.loginUserNotFound.code);
            expect(error.message).toBe(fakeData.userService.loginUserNotFound.responseError.error.message);
          }
        }
      });
    });

    describe('Testando caso de error do login quando o usuario não é encontrado', () => {
      beforeEach(() => {
        jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(fakeData.userService.login.mock);
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('Teste de caso de sucesso do login', async () => {
        try {
          await Service.login(fakeData.userService.loginUserWrongPassword.serviceParams);
        } catch (error) {
          expect(error).toBeInstanceOf(UnauthorizedError);
          if (error instanceof UnauthorizedError) {
            expect(error.code).toBe(fakeData.userService.loginUserWrongPassword.code);
            expect(error.message).toBe(fakeData.userService.loginUserWrongPassword.responseError.error.message);
          }
        }
      });
    });
  });
  
  describe('Testando o service de register', () => {
    describe('Testando caso de sucesso so register', () => {
      beforeEach(() => {
        jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
        jest.spyOn(prisma.user, 'create').mockResolvedValue(fakeData.userService.service.mockCreate);
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('Testando a resposta do service', async () => {
        const register = await Service.register(fakeData.userService.service.user);

        expect(() => register).not.toThrow();
        expect(register).toStrictEqual(fakeData.userService.service.response);
      });
    });
  });
});
