import { Request, Response } from 'express';
import { IWorkspaceColumn } from '../../../typescript/interfaces/routes';
import * as Service from '../services';

const create = async (req: Request, res: Response) => {
  const { title, workspaceId } = req.body as IWorkspaceColumn;
  const { userId } = req.tokenData;

  const result = await Service.create({ title, workspaceId }, userId);

  res.status(201).json({ data: result });
};

export { create };
