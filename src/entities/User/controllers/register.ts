import { Request, Response } from 'express';
import JwtGenerate from '../../../helpers/JwtGenerate';
import * as Service from '../services';

// register: RequestHandler
const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, uuid } = req.body;

  const result = await Service.register({ firstName, lastName, email, password, uuid });

  const token = JwtGenerate({ email, userId: result.id });

  res.status(201).json({ data: result, token });
};

export { register };
