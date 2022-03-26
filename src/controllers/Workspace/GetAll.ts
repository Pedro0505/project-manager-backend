import { Request, Response } from 'express';
import * as Service from '../../services/Workspace';

const GetAll = async (req: Request, res: Response) => {
  const { email } = req.tokenData;

  const result = await Service.GetAll(email);

  res.status(200).json({ data: result });
};

export { GetAll };
