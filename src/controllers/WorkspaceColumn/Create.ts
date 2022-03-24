import { Request, Response } from 'express';
import * as Service from '../../services/WorkspaceColumn';

const Create = async (req: Request, res: Response) => {
  const { title, workspaceId } = req.body;

  const result = await Service.Create({ title, workspaceId });

  res.status(201).json({ data: result });
};

export { Create };
