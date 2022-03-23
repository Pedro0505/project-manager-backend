import { Request, Response, NextFunction } from 'express';
import IError from '../@types/Error';

const errorMiddleware = (err: IError, _req: Request, res: Response, _next: NextFunction) => {
  if (err.code && typeof err.code === 'number') {
    const { code, message } = err;

    return res.status(code).json({ message });
  }

  console.log(err);
  return res.status(500).json({ message: err.message });
};

export default errorMiddleware;
