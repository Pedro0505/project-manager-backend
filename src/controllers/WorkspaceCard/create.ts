import { Request, Response } from 'express';
import { IWorkspaceCardCreate } from '../../interfaces/routes';
import * as Service from '../../services/WorkspaceCard';

const create = async (req: Request, res: Response) => {
  const { content, title, columnId, index } = req.body as IWorkspaceCardCreate;

  const newCard = await Service.create({ content, title, columnId, index });

  res.status(201).json({ data: newCard });
};

export { create };
