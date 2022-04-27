import { Request, Response } from 'express';
import { IWorkspaceCardCreate } from '../../../typescript/interfaces/routes';
import * as Service from '../services';

const create = async (req: Request, res: Response) => {
  const { content, title, columnId } = req.body as IWorkspaceCardCreate;

  const newCard = await Service.create({ content, title, columnId });

  res.status(201).json({ data: newCard });
};

export { create };
