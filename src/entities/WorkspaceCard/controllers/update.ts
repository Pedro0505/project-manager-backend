import { RequestHandler } from 'express';
import { IWorkspaceCardUpdate } from '../../../typescript/interfaces/routes';
import * as Service from '../services';

const update: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { columnId, content, title } = req.body as IWorkspaceCardUpdate;

  const result = await Service.update(id, { columnId, content, title });

  res.status(200).json({ data: result });
};

export { update };
