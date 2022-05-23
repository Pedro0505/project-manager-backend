import prisma from "../../../src/database/prisma";
import * as fakeData from "../../fakeData/unit";
import * as Service from '../../../src/entities/Workspace/services';

describe('Testando o service do workspace', () => {
  describe('Testando o create do workspace', () => {
    describe('Caso de sucesso do create', () => {
      beforeEach(() => {
        jest.spyOn(prisma.workspace, 'create').mockResolvedValue(fakeData.workspaceService.workspaceCreate.createMock);
      });
      
      afterEach(() => {
        jest.clearAllMocks();
      });

      it('Testando a resposta do create', async () => {
        const create = await Service.create(fakeData.workspaceService.workspaceCreate.serviceCall);

        expect(() => create).not.toThrow();
        expect(create).toStrictEqual(fakeData.workspaceService.workspaceCreate.serviceReturn);
      });
    });
  });
});
