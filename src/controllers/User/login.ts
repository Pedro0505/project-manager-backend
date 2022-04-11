import { Request, Response } from 'express';
import * as Service from '../../services/User';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const token = await Service.login({ email, password });

  res.status(200).json({ token });
};

export { login };
