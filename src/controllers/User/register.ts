import { Request, Response } from 'express';
import JwtGenerate from '../../helpers/JwtGenerate';
import * as UserService from '../../services/User';

// register: RequestHandler
const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  const result = await UserService.register({ firstName, lastName, email, password });

  const token = JwtGenerate({ email, userId: result.id });

  res.status(201).json({ data: result, token });
};

export { register };
