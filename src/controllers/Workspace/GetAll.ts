import { Request, Response } from 'express';
import * as Service from '../../services/Workspace';

const getAll = async (req: Request, res: Response) => {
  const { email } = req.tokenData;

  const result = await Service.getAll(email);

  res.status(200).json({ data: result });
};

export { getAll };
