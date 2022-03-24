import { Request, Response } from 'express';
import * as Service from '../../services/User';

const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const token = await Service.Login({ email, password });

  res.status(200).json({ token });
};

export { Login };
