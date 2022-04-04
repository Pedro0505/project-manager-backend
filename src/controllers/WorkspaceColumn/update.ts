import { Request, Response } from 'express';
import BadRequestError from '../../helpers/BadRequestError';
import { IWorkspaceColumnUpdate } from '../../interfaces/routes';
import * as Service from '../../services/WorkspaceColumn';

const update = async (req: Request, res: Response) => {
  const id = +req.params.id;
  const { title, index } = req.body as IWorkspaceColumnUpdate;

  if (Number.isNaN(id)) throw new BadRequestError('invalid id');

  const result = await Service.update(id, { title, index });

  res.status(200).json(result);
};

export { update };
