import { Request, Response } from 'express';
import * as Login from '../../../src/entities/User/services/login';
import * as Register from '../../../src/entities/User/services/register';
import * as findUserByEmail from '../../../src/entities/User/services/findUserByEmail';
import * as Controllers from '../../../src/entities/User/controllers';
import * as fakeData from '../../fakeData/unit';
import * as JwtGenerate from '../../../src/helpers/JwtGenerate';

describe('Users controllers', () => {
  describe('Teste Login controller', () => {
    const req: Partial<Request>= {  };
    
    const res: Partial<Response> = {  };
  
    beforeEach(() => {
      req.body = jest.fn().mockReturnValue(fakeData.userController.login.body);
      
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      
      jest.spyOn(Login, 'login').mockResolvedValue(fakeData.userController.login.token);
    });
    
    afterEach(() => {
      jest.restoreAllMocks();
    });
    
    it('Teste se o controller responde com o status 200', async () => {
      await Controllers.login(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('Teste se o controller responde um json com um token', async () => {
      await Controllers.login(req as Request, res as Response);
  
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({ token: fakeData.userController.login.token });
    });
  });

  describe('Teste Register controller', () => {
    const req: Partial<Request>= {  };
    
    const res: Partial<Response> = {  };
  
    beforeEach(() => {
      req.body = jest.fn().mockReturnValue(fakeData.userController.login.body);
      
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      
      jest.spyOn(Register, 'register').mockResolvedValue(fakeData.userController.register.body);
      jest.spyOn(JwtGenerate, 'default').mockReturnValue(fakeData.userController.register.token);
    });
    
    afterEach(() => {
      jest.restoreAllMocks();
    });
    
    it('Teste se o controller responde com o status 201', async () => {
      await Controllers.register(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('Teste se o controller responde um json com um token e um data com a informação do usuario', async () => {
      await Controllers.register(req as Request, res as Response);
  
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({data: { ...fakeData.userController.register.body }, token: fakeData.userController.register.token });
    });
  });

  describe('Teste findUserByEmail controller', () => {
    const req: Partial<Request>= {  };
    
    const res: Partial<Response> = {  };
  
    beforeEach(() => {
      req.query = fakeData.userController.findUserByEmail.query
      
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      
      jest.spyOn(findUserByEmail, 'findUserByEmail').mockResolvedValue(fakeData.userController.findUserByEmail.serviceMock);
    });
    
    afterEach(() => {
      jest.restoreAllMocks();
    });
    
    it('Teste se o controller responde com o status 200', async () => {
      await Controllers.findUserByEmail(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('Teste se o service é chamado responde com o valor da querry', async () => {
      await Controllers.findUserByEmail(req as Request, res as Response);
  
      expect(findUserByEmail.findUserByEmail).toHaveBeenCalledWith('pedro@gmail.com');
    });

    it('Teste se o controller responde um json com um email e um uuid', async () => {
      await Controllers.findUserByEmail(req as Request, res as Response);
  
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(fakeData.userController.findUserByEmail.serviceMock);
    });
  });
})
