import { Request, Response, NextFunction } from 'express';
import joi from 'joi';
import { workspace } from './schemas/schemas.joi';
import BadRequestError from '../helpers/BadRequestError';
import { IRequestWorkspaceBody } from '../typescript/interfaces/routes';

const schema = joi.object<IRequestWorkspaceBody>({
  workspaceName: workspace.workspaceName,
});

const validateCreateWorkspace = (req: Request, _res: Response, next: NextFunction) => {
  const { workspaceName }: IRequestWorkspaceBody = req.body;
  const { error } = schema.validate({ workspaceName });

  if (error) return next(new BadRequestError(error.message));

  next();
};

export { validateCreateWorkspace };
