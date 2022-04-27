import { Request, Response } from 'express';
import * as Service from '../services';

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.tokenData;
  let workspace;

  if (req.query?.includeColumns === 'true') workspace = await Service.getWithColumns(id, userId);
  else workspace = await Service.getById(id, userId);

  res.status(200).json({ data: workspace });
};

export { getById };
