import jwt from 'jsonwebtoken';
import prisma from '../../../src/database/prisma';
import * as Service from '../../../src/entities/User/services';
import ConflictError from '../../../src/helpers/ConflictError';
import NotFoundError from '../../../src/helpers/NotFoundError';
import { IUserTest } from '../../interfaces/user';
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

      it('Testando quando o usuario não é encontrado o service lança o erro', async () => {
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
    describe('Testando caso de sucesso do register', () => {
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

    describe('Testando caso de error do register service quando o email já existe', () => {
      beforeEach(() => {
        jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(fakeData.userService.serviceConflict.mock);
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('Testando se o error é um ConflictError', async () => {
        try {
          await Service.register(fakeData.userService.service.user);
        } catch (error) {
          expect(error).toBeInstanceOf(ConflictError);
          if (error instanceof ConflictError) {
            expect(error.code).toBe(409);
            expect(error.message).toBe(fakeData.userService.serviceConflict.responseError.error.message);
          }
        }
      });
    });
  });

  describe('Testando o service de findUserByEmail', () => {
    describe('Testando caso de sucesso do findUserByEmail', () => {
      beforeEach(() => {
        jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(fakeData.userService.findUserByEmail.mock as IUserTest);
      });
  
      afterEach(() => {
        jest.restoreAllMocks();
      });

      it ('Testando a responta do service', async () => {
        const find = await Service.findUserByEmail('pedro@gmail.com');

        expect(() => find).not.toThrow();
        expect(find).toStrictEqual(fakeData.userService.findUserByEmail.response);
      });
    });


    describe('Testando caso de erro do findUserByEmail', () => {
      beforeEach(() => {
        jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
      });
  
      afterEach(() => {
        jest.restoreAllMocks();
      });

      it ('Testando a responta de erro do service', async () => {
        try {
          await Service.findUserByEmail('pedro@gmail.com');
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundError);
          if (error instanceof NotFoundError) {
            expect(error.code).toBe(fakeData.userService.findByUserNotFound.code);
            expect(error.message).toBe(fakeData.userService.findByUserNotFound.responseError.error.message);
          }
        }
      });
    });
  });
});
