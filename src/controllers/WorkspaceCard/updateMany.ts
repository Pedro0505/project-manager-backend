import { RequestHandler } from 'express';
import * as Service from '../../services/WorkspaceCard';

const updateMany: RequestHandler = async (req, res) => {
  const payload = req.body;

  const result = await Service.updateMany(payload);

  res.status(200).json({ data: result });
};

export { updateMany };
