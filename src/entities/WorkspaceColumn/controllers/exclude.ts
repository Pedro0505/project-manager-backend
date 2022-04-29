import { Request, Response } from 'express';
import * as Services from '../services';

const exclude = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.tokenData;

  await Services.exclude(userId, id);

  res.status(204).end();
};

export { exclude };
