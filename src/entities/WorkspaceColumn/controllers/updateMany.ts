import { RequestHandler } from 'express';
import * as Service from '../services';

const updateMany: RequestHandler = async (req, res) => {
  const payload = req.body;
  const { userId } = req.tokenData;

  const result = await Service.updateMany(payload, userId);

  res.status(200).json({ data: result });
};

export { updateMany };
