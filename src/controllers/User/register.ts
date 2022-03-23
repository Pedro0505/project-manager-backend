import { Request, Response } from 'express';
import * as UserService from '../../services/User';

const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  const result = await UserService.register({ firstName, lastName, email, password });

  res.status(200).json({ data: result });
};

export default register;
