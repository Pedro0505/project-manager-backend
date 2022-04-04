import { Request, Response, NextFunction } from 'express';
import joi from 'joi';
import { workspace } from './schemas/schemas.joi';
import BadRequestError from '../helpers/BadRequestError';
import { IRequestWorkspaceBody } from '../interfaces/routes';

const schema = joi.object<IRequestWorkspaceBody>({
  userId: workspace.userId,
  workspaceName: workspace.workspaceName,
});

const validateCreateWorkspace = (req: Request, _res: Response, next: NextFunction) => {
  const { userId, workspaceName }: IRequestWorkspaceBody = req.body;
  const { error } = schema.validate({ userId, workspaceName });

  if (error) return next(new BadRequestError(error.message));

  next();
};

export { validateCreateWorkspace };
