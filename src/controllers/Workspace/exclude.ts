import { Request, Response } from 'express';
import * as Services from '../../services/Workspace';

const exclude = async (req: Request, res: Response) => {
  const { id } = req.params;

  await Services.exclude(id);

  res.status(204).end();
};

export { exclude };
