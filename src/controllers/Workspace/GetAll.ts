import { Request, Response } from 'express';
import * as Service from '../../services/Workspace';

const getAll = async (req: Request, res: Response) => {
  const { userId } = req.tokenData;

  const result = await Service.getAll(userId);

  res.status(200).json({ data: result });
};

export { getAll };
