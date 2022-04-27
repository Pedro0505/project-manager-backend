import { Request, Response, NextFunction } from 'express';
import joi from 'joi';
import { workspaceCard } from './schemas/schemas.joi';
import BadRequestError from '../helpers/BadRequestError';
import { IWorkspaceCardCreate } from '../typescript/interfaces/routes';

const schema = joi.object<IWorkspaceCardCreate>({
  columnId: workspaceCard.columnId,
  content: workspaceCard.content,
  title: workspaceCard.title,
});

const validateCreateWorkspaceCard = (req: Request, _res: Response, next: NextFunction) => {
  const { content, title, columnId }: IWorkspaceCardCreate = req.body;
  const { error } = schema.validate({ content, title, columnId });

  if (error) return next(new BadRequestError(error.message));

  next();
};

export { validateCreateWorkspaceCard };
