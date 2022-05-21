import { Request, Response } from 'express';
import * as Create from '../../../src/entities/Workspace/services/create';
import * as Exclude from '../../../src/entities/Workspace/services/exclude';
import { IRequestToken } from '../../interfaces/express';
import * as Controllers from '../../../src/entities/Workspace/controllers';
import * as fakeData from '../../fakeData/unit';

describe('Testando o controller do workspace', () => {
  describe('Testando o create do workspace controller', () => {
    const req: Partial<IRequestToken>= {  };
    
    const res: Partial<Response> = {  };
  
    beforeEach(() => {
      req.body = fakeData.workspaceController.create.body;
      req.tokenData = fakeData.workspaceController.create.tokenData;

      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      jest.spyOn(Create, 'create').mockResolvedValue(fakeData.workspaceController.create.mock);
    });
  
    afterEach(() => {
      jest.restoreAllMocks();
    });
  
    it('Testando a chamada do json do create', async () => {
      await Controllers.create(req as Request, res as Response)
      
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({ data: fakeData.workspaceController.create.service });
    });

    it('Testando a chamada do status do create retorna 201', async () => {
      await Controllers.create(req as Request, res as Response)
      
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
    });
  });
});
