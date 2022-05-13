import { Request, Response } from 'express';
import * as Login from '../../../src/entities/User/services/login';
import * as Controllers from '../../../src/entities/User/controllers';
import * as fakeData from '../../fakeData/unit';

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
})
