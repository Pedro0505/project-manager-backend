import { Request, Response } from 'express';
import * as Service from '../services';

const create = async (req: Request, res: Response) => {
  const { workspaceName } = req.body;
  const { userId } = req.tokenData;

  const result = await Service.create({ ownerId: userId, workspaceName });

  res.status(201).json({ data: result });
};

export { create };
