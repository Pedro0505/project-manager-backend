import { Request, Response } from 'express';
import BadRequestError from '../../helpers/BadRequestError';
import * as Service from '../../services/WorkspaceColumn';

const update = async (req: Request, res: Response) => {
  const id = +req.params.id;
  const { title } = req.body as { title: string };

  if (Number.isNaN(id)) throw new BadRequestError('invalid id');

  await Service.update(id, title);

  res.status(204).end();
};

export { update };
