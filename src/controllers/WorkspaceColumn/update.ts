import { Request, Response } from 'express';
import { IWorkspaceColumnUpdate } from '../../interfaces/routes';
import * as Service from '../../services/WorkspaceColumn';

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body as IWorkspaceColumnUpdate;

  const result = await Service.update(id, { title });

  res.status(200).json({ data: result });
};

export { update };
