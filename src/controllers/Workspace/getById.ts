import { Request, Response } from 'express';
import * as Service from '../../services/Workspace';

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.tokenData;

  const workspace = await Service.getById(id, userId);

  res.status(200).json({ data: workspace });
};

export { getById };
