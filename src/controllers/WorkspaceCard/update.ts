import { RequestHandler } from 'express';
import { IWorkspaceCardUpdate } from '../../interfaces/routes';
import * as Service from '../../services/WorkspaceCard';

const update: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { columnId, content, index, title } = req.body as IWorkspaceCardUpdate;

  const result = await Service.update(id, { columnId, content, index, title });

  res.status(200).json({ data: result });
};

export { update };
