import { Request, Response } from 'express';
import * as Service from '../../services/WorkspaceCard';

const Create = async (req: Request, res: Response) => {
  const { content, title, columnId } = req.body;

  const result = await Service.Create({ content, title, columnId });

  res.status(201).json({ data: result });
};

export { Create };
