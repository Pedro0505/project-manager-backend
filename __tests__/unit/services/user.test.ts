import jwt from 'jsonwebtoken';
import prisma from '../../../src/database/prisma';
import * as Service from '../../../src/entities/User/services';
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
    
      it('Teste de caso de sucesso do login', () => {
        expect(async () => (
          await Service.login(fakeData.userService.loginUserNotFound.serviceParams)
        ))
        .rejects
        .toThrow('email not found');
      });
    });
  });
});
