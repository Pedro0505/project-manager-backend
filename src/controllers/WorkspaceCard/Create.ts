import { Request, Response } from 'express';
import * as Service from '../../services/WorkspaceCard';

const create = async (req: Request, res: Response) => {
  const { content, title, columnId } = req.body;

  const result = await Service.create({ content, title, columnId });

  res.status(201).json({ data: result });
};

export { create };
