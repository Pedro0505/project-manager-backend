import jwt from 'jsonwebtoken';
import prisma from '../../../src/database/prisma';
import * as Service from '../../../src/entities/User/services';
import NotFoundError from '../../../src/helpers/NotFoundError';
import * as fakeData from '../../fakeData/unit';
import { IDecoded } from '../../interfaces/jwt';

describe('Teste User Service', () => {
  describe('Testando o service de login', () => {
    describe('Testando caso de sucesso do login', () => {
      beforeEach(() => {
        jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(fakeData.userService.login.mock);
      })
  
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
      })

      afterEach(() => {
        jest.restoreAllMocks();
      });
    
      it('Teste de caso de error testando a menssagem ', async () => {
        try {
          await Service.login(fakeData.userService.loginUserNotFound.serviceParams)
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundError)
          if (error instanceof NotFoundError) {
            expect(error.code).toBe(fakeData.userService.loginUserNotFound.code)
            expect(error.message).toBe(fakeData.userService.loginUserNotFound.responseError.error.message)
          }
        }
      });
    });
  });
});
