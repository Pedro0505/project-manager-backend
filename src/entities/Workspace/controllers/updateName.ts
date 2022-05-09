import { Request, Response } from 'express';
import * as Service from '../services';

const updateName = async (req: Request, res: Response) => {
  const { name, id } = req.body;
  const { userId } = req.tokenData;

  const response = await Service.updateName(name, id, userId);

  res.status(200).json({ data: response });
};

export { updateName };
