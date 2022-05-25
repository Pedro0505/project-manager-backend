import prisma from '../../../src/database/prisma';
import * as fakeData from '../../fakeData/unit';
import * as Service from '../../../src/entities/Workspace/services';
import * as workspaceAuthorization from '../../../src/entities/Workspace/helper/authorization';
import NotFoundError from '../../../src/helpers/NotFoundError';
import UnauthorizedError from '../../../src/helpers/UnauthorizedError';

describe('Testando o service do workspace', () => {
  describe('Testando o create do workspace', () => {
    describe('Caso de sucesso do create', () => {
      beforeEach(() => {
        jest.spyOn(prisma.workspace, 'create').mockResolvedValue(fakeData.workspaceService.workspaceCreate.createMock);
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('Testando a resposta do create', async () => {
        const create = await Service.create(fakeData.workspaceService.workspaceCreate.serviceCall);

        expect(() => create).not.toThrow();
        expect(create).toStrictEqual(fakeData.workspaceService.workspaceCreate.serviceReturn);
      });
    });
  });

  describe('Testando o exclude do workspace', () => {
    describe('Testando caso de sucesso do exclude', () => {
      beforeEach(() => {
        jest.spyOn(workspaceAuthorization, 'default').mockResolvedValue(undefined);
        jest.spyOn(prisma.workspace, 'delete').mockResolvedValue(fakeData.workspaceService.workspaceCreate.createMock);
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('Testando a resposta do service e se ele não laça erro', async () => {
        const deleted = await Service.exclude(fakeData.workspaceService.exclude.id, fakeData.workspaceService.exclude.userId);

        expect(() => deleted).not.toThrow();
        expect(deleted).toBeUndefined();
      });
    });

    describe('Testando o caso de erro do workspace service', () => {
      describe('Quando o workspace não é encontrado', () => {
        beforeEach(() => {
          jest.spyOn(prisma.workspace, 'findFirst').mockResolvedValue(null);
        });
  
        afterEach(() => {
          jest.restoreAllMocks();
        });
  
        it('Testando se ele é um not found error, retorna um code 404, e sua mensagem', async () => {
          expect.assertions(3);
          try {
            await Service.exclude(fakeData.workspaceService.excludeNotFound.id, fakeData.workspaceService.excludeNotFound.userId);
          } catch (error) {
            expect(error).toBeInstanceOf(NotFoundError);
            if (error instanceof NotFoundError) {
              expect(error.code).toBe(fakeData.workspaceService.excludeNotFound.code);
              expect(error.message).toBe(fakeData.workspaceService.excludeNotFound.message);
            }
          }
        });
      });

      describe('Quando o usuario não tem autorização', () => {
        beforeEach(() => {
          jest.spyOn(prisma.workspace, 'findFirst').mockResolvedValue(fakeData.workspaceService.excludeUnauthorized.findFirstMock);
        });
  
        afterEach(() => {
          jest.restoreAllMocks();
        });

        it('Testando se o error é um UnauthorizedError, sua mensagem e se o code é 401', async () => {
          expect.assertions(3);
          try {
            await Service.exclude(fakeData.workspaceService.excludeUnauthorized.serviceCall.id, fakeData.workspaceService.excludeUnauthorized.serviceCall.userId);
          } catch (error) {
            expect(error).toBeInstanceOf(UnauthorizedError);
            if (error instanceof UnauthorizedError) {
              expect(error.code).toBe(fakeData.workspaceService.excludeUnauthorized.code);
              expect(error.message).toBe(fakeData.workspaceService.excludeUnauthorized.message);
            }
          }
        })
      });
    });
  });
});
