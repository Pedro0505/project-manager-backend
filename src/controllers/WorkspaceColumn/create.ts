import { Request, Response } from 'express';
import { IWorkspaceColumn } from '../../interfaces/routes';
import * as Service from '../../services/WorkspaceColumn';

const create = async (req: Request, res: Response) => {
  const { title, workspaceId, index } = req.body as IWorkspaceColumn;

  const result = await Service.create({ title, workspaceId, index });

  res.status(201).json({ data: result });
};

export { create };
