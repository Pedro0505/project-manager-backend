import { Request, Response } from 'express';
import * as Create from '../../../src/entities/Workspace/services/create';
import * as Exclude from '../../../src/entities/Workspace/services/exclude';
import * as GetAll from '../../../src/entities/Workspace/services/getAll';
import * as GetById from '../../../src/entities/Workspace/services/getById';
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

    it('Testando o service do create e vendo se ele é chamado com o userId e o workspaceName', async () => {
      await Controllers.create(req as Request, res as Response)
      
      expect(Create.create).toHaveBeenCalledTimes(1);
      expect(Create.create).toHaveBeenCalledWith(fakeData.workspaceController.create.callService);
    });
  });

  describe('Testando o exclude do workspace controller', () => {
    const req: Partial<IRequestToken>= {  };
    
    const res: Partial<Response> = {  };
  
    beforeEach(() => {
      req.params = fakeData.workspaceController.exclude.params;
      req.tokenData = fakeData.workspaceController.exclude.tokenData;

      res.status = jest.fn().mockReturnValue(res);
      res.end = jest.fn().mockReturnValue(res);

      jest.spyOn(Exclude, 'exclude').mockResolvedValue(undefined);
    });
  
    afterEach(() => {
      jest.restoreAllMocks();
    });
  
    it('Testando a chamada do json do exclude', async () => {
      await Controllers.exclude(req as Request, res as Response)
      
      expect(res.end).toHaveBeenCalledTimes(1);
      expect(res.end).toHaveBeenCalled();
    });

    it('Testando a chamada do status do exclude retorna 204', async () => {
      await Controllers.exclude(req as Request, res as Response)
      
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(204);
    });

    it('Testando o service do exclude e vendo se ele é chamado com o userId e o id do workspace', async () => {
      await Controllers.exclude(req as Request, res as Response)
      
      expect(Exclude.exclude).toHaveBeenCalledTimes(1);
      expect(Exclude.exclude).toHaveBeenCalledWith(fakeData.workspaceController.exclude.callService.id, fakeData.workspaceController.exclude.callService.userId);
    });
  });

  describe('Testando o getAll do workspace controller', () => {
    const req: Partial<IRequestToken>= {  };
    
    const res: Partial<Response> = {  };
  
    beforeEach(() => {
      req.tokenData = fakeData.workspaceController.getAll.tokenData;

      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      jest.spyOn(GetAll, 'getAll').mockResolvedValue(fakeData.workspaceController.getAll.mockService);
    });
  
    afterEach(() => {
      jest.restoreAllMocks();
    });
  
    it('Testando a chamada do json do getAll', async () => {
      await Controllers.getAll(req as Request, res as Response)
      
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({ data: fakeData.workspaceController.getAll.mockService });
    });

    it('Testando a chamada do status do getAll retorna 200', async () => {
      await Controllers.getAll(req as Request, res as Response)
      
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('Testando o service do getAll e vendo se ele é chamado com o userId', async () => {
      await Controllers.getAll(req as Request, res as Response)
      
      expect(GetAll.getAll).toHaveBeenCalledTimes(1);
      expect(GetAll.getAll).toHaveBeenCalledWith(fakeData.workspaceController.getAll.tokenData.userId);
    });
  });

  describe('Testando o getById do workspace controller', () => {
    const req: Partial<IRequestToken>= {  };
    
    const res: Partial<Response> = {  };
  
    beforeEach(() => {
      req.tokenData = fakeData.workspaceController.getById.tokenData;
      req.query = fakeData.workspaceController.getById.query;
      req.params = fakeData.workspaceController.getById.params;

      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      jest.spyOn(GetById, 'getById').mockResolvedValue(fakeData.workspaceController.getById.mockService);
    });
  
    afterEach(() => {
      jest.restoreAllMocks();
    });
  
    it('Testando a chamada do json do getById', async () => {
      await Controllers.getById(req as Request, res as Response)
      
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({ data: fakeData.workspaceController.getById.mockService });
    });

    it('Testando a chamada do status do getById retorna 200', async () => {
      await Controllers.getById(req as Request, res as Response)
      
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('Testando o service do getById e vendo se ele é chamado com o userId', async () => {
      await Controllers.getById(req as Request, res as Response)
      
      expect(GetById.getById).toHaveBeenCalled();
      expect(GetById.getById).toHaveBeenCalledTimes(1);
      expect(GetById.getById).toHaveBeenCalledWith(fakeData.workspaceController.getById.callService.id, fakeData.workspaceController.getById.callService.userId);
    });
  });
});
