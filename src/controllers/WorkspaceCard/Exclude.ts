import { Request, Response } from 'express';
import BadRequestError from '../../helpers/BadRequestError';
import * as Services from '../../services/WorkspaceCard';

const exclude = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (Number.isNaN(id)) throw new BadRequestError('invalid id');

  await Services.exclude(+id);

  res.status(204).end();
};

export { exclude };
