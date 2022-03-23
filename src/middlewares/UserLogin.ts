import { Request, Response, NextFunction } from 'express';
import joi from 'joi';
import { user } from './schemas/schemas.joi';
import BadRequestError from '../helpers/BadRequestError';
import { IUser } from '../interfaces/prisma';

const schema = joi.object({
  email: user.email,
  password: user.password,
});

const validateUserLogin = (req: Request, _res: Response, next: NextFunction) => {
  const { email, password }: IUser = req.body;
  const { error } = schema.validate({ email, password });

  if (error) return next(new BadRequestError(error.message));

  next();
};

export default validateUserLogin;
