import { Request, Response } from 'express';
import * as Service from '../services';

const findUserByEmail = async (req: Request, res: Response) => {
  const { q } = req.query;

  const result = await Service.findUserByEmail(q as string);

  res.status(200).json(result);
};

export { findUserByEmail };
