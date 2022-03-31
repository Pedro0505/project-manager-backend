import { Request, Response } from 'express';
import * as Service from '../../services/WorkspaceColumn';

const create = async (req: Request, res: Response) => {
  const { title, workspaceId } = req.body;

  const result = await Service.create({ title, workspaceId });

  res.status(201).json({ data: result });
};

export { create };
