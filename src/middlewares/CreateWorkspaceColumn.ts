import { Request, Response, NextFunction } from 'express';
import joi from 'joi';
import { workspaceColumn } from './schemas/schemas.joi';
import BadRequestError from '../helpers/BadRequestError';
import { IWorkspaceColumn } from '../typescript/interfaces/prisma';

const schema = joi.object<IWorkspaceColumn>({
  workspaceId: workspaceColumn.workspaceId,
  title: workspaceColumn.title,
});

const validateCreateWorkspaceColumn = (req: Request, _res: Response, next: NextFunction) => {
  const { title, workspaceId }: IWorkspaceColumn = req.body;
  const { error } = schema.validate({ title, workspaceId });

  if (error) return next(new BadRequestError(error.message));

  next();
};

export { validateCreateWorkspaceColumn };
