import { Request, Response } from 'express';
import * as Service from '../../services/Workspace';

const create = async (req: Request, res: Response) => {
  const { userId, workspaceName } = req.body;

  const result = await Service.create({ ownerId: userId, workspaceName });

  res.status(201).json({ data: result });
};

export { create };
