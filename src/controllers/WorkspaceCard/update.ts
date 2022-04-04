import { RequestHandler } from 'express';
import BadRequestError from '../../helpers/BadRequestError';
import { IWorkspaceCardUpdate } from '../../interfaces/routes';
import * as Service from '../../services/WorkspaceCard';

const update: RequestHandler = async (req, res) => {
  const id = +req.params.id;
  const { columnId, content, index, title } = req.body as IWorkspaceCardUpdate;

  if (Number.isNaN(id)) throw new BadRequestError('invalid id');

  const result = await Service.update(id, { columnId, content, index, title });

  res.status(200).json(result);
};

export { update };
