import { Request, Response } from 'express';
import * as Service from '../../services/User';

const findeUserByEmail = async (req: Request, res: Response) => {
  const { q } = req.query;

  const result = await Service.findeUserByEmail(q as string);

  res.status(200).json(result);
};

export { findeUserByEmail };
