import { Request, Response } from 'express';
import * as Service from '../../services/Workspace';

const getById = async (req: Request, res: Response) => {
  const id = +req.params.id;
  const { email } = req.tokenData;

  const workspace = await Service.getById(id, email);

  res.status(200).json({ data: workspace });
};

export { getById };
