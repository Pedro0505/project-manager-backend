import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UnauthorizedError from '../helpers/UnauthorizedError';
import { IDecoded } from '../interfaces/jwt/IDecoded';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) return next(new UnauthorizedError('token not found'));

  try {
    const { JWT_SECRET } = process.env;

    const decoded = jwt.verify(authorization, JWT_SECRET) as IDecoded;

    req.tokenData = decoded.tokenData;

    return next();
  } catch (error) {
    return next(new UnauthorizedError('expired or invalid token'));
  }
};

export default auth;
