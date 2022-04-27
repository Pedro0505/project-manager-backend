import { Request, Response, NextFunction } from 'express';
import IError from '../typescript/interfaces/Error';

const errorMiddleware = (err: IError, _req: Request, res: Response, _next: NextFunction) => {
  if (err.code && typeof err.code === 'number') {
    const { code, message } = err;

    return res.status(code).json({ error: { message } });
  }

  console.log(err);
  return res.status(500).json({ error: { message: err.message } });
};

export { errorMiddleware };
