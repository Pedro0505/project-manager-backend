import joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { workspaceCardUpdate } from './schemas/schemas.joi';
import BadRequestError from '../helpers/BadRequestError';
import { IWorkspaceCardUpdate } from '../interfaces/routes';

const schema = joi.object<IWorkspaceCardUpdate>({
  columnId: workspaceCardUpdate.columnId,
  index: workspaceCardUpdate.index,
  title: workspaceCardUpdate.title,
  content: workspaceCardUpdate.content,
});

const updateWorkspaceCard = (req: Request, _res: Response, next: NextFunction) => {
  const { columnId, index, title, content } = req.body as IWorkspaceCardUpdate;

  const { error } = schema.validate({ columnId, index, title, content });

  if (error) return next(new BadRequestError(error.message));

  next();
};

export { updateWorkspaceCard };
