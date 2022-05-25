import prisma from '../../../src/database/prisma';
import * as fakeData from '../../fakeData/unit';
import * as Service from '../../../src/entities/Workspace/services';
import * as workspaceAuthorization from '../../../src/entities/Workspace/helper/authorization';
import NotFoundError from '../../../src/helpers/NotFoundError';

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
  });
});
