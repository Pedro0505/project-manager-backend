import { Request, Response, NextFunction } from 'express';
import joi from 'joi';
import { user } from './schemas/schemas.joi';
import BadRequestError from '../helpers/BadRequestError';
import { IUserLogin } from '../typescript/interfaces/routes';

const schema = joi.object<IUserLogin>({
  email: user.email,
  password: user.password,
});

const validateUserLogin = (req: Request, _res: Response, next: NextFunction) => {
  const { email, password } = req.body as IUserLogin;
  const { error } = schema.validate({ email, password });

  if (error) return next(new BadRequestError(error.message));

  next();
};

export { validateUserLogin };
