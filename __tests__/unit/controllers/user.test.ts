import { Request, Response } from 'express';
import * as Login from '../../../src/entities/User/services/login';
import * as Controllers from '../../../src/entities/User/controllers';

describe('Users controllers', () => {
  describe('Teste Login controller', () => {
    const req: Partial<Request>= {  };
    
    const res: Partial<Response> = {  };
  
    beforeEach(() => {
      req.body = jest.fn().mockReturnValue({ email: 'pedro@gmail.com', password: '12345678' });
      
      res.json = jest.fn().mockReturnValue(res);
      res.status = jest.fn().mockReturnValue(res);
  
      res.json = jest.fn().mockReturnValue(res);
      res.status = jest.fn().mockReturnValue(res);
  
      jest.spyOn(Login, 'login').mockResolvedValue(Promise.resolve('aRandomToken'));
    });
  
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('Teste se o controller responde com o status 200', async () => {
      await Controllers.login(req as Request, res as Response);
  
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('Teste se o controller responde um json com um token', async () => {
      await Controllers.login(req as Request, res as Response);
  
      expect(res.json).toHaveBeenCalledWith({ token: 'aRandomToken' });
    });
  });
})
