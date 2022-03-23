import { Request, Response, NextFunction } from 'express';
import joi from 'joi';
import { user } from './schemas/schemas.joi';
import BadRequestError from '../helpers/BadRequestError';
import { IUser } from '../interfaces/prisma';

const schema = joi.object<IUser>({
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  password: user.password,
});

const validateUserRegister = (req: Request, _res: Response, next: NextFunction) => {
  const { email, firstName, lastName, password }: IUser = req.body;
  const { error } = schema.validate({ email, firstName, lastName, password });

  console.log(req.body, error);
  if (error) return next(new BadRequestError(error.message));

  next();
};

export default validateUserRegister;
