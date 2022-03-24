import { Request, Response } from 'express';
import * as Service from '../../services/Workspace';

const Create = async (req: Request, res: Response) => {
  const { userId, workspaceName } = req.body;

  const result = await Service.Create({ ownerId: userId, workspaceName });

  return res.status(201).json({ data: result });
};

export { Create };
