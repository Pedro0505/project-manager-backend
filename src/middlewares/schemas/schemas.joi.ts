import joi from 'joi';

export const user = {
  email: joi.string().email().required()
    .messages({
      'string.email': '"email" must be a valid email',
      'any.required': '"email" is required',
    }),

  firstName: joi.string().min(3).max(60).required()
    .messages({
      'string.min': '"firstName" is at least 3 characters long',
      'string.max': '"firstName" is up to 60 characters long',
      'any.required': '"firstName" is required',
    }),

  lastName: joi.string().min(3).max(60).required()
    .messages({
      'string.min': '"lastName" is at least 3 characters long',
      'string.max': '"lastName" is up to 60 characters long',
      'any.required': '"lastName" is required',
    }),

  password: joi.string().min(6).max(20).required()
    .messages({
      'string.min': '"password" is at least 6 characters long',
      'string.max': '"password" is up to 20 characters long',
      'any.required': '"password" is required',
    }),
};

export const workspace = {
  userId: joi.string().required().strict()
    .messages({
      'any.required': '"userId" is required',
    }),
  workspaceName: joi.string().min(1).required()
    .messages({
      'any.required': '"workspaceName" is required',
    }),
};

export const workspaceColumn = {
  workspaceId: joi.string().required().strict()
    .messages({
      'any.required': '"workspaceId" is required',
    }),
  title: joi.string().required()
    .messages({
      'any.required': '"title" is required',
    }),
};

export const workspaceCard = {
  columnId: joi.string().required().strict()
    .messages({
      'any.required': '"columnId" is required',
    }),
  title: joi.string(),
  content: joi.string().required()
    .messages({
      'any.required': '"content" is required',
    }),
};

export const workspaceCardUpdate = {
  columnId: joi.string().strict()
    .messages({
      'number.base': '"columnId" must be a number',
    }),
  title: joi.string()
    .messages({
      'string.base': '"title" must be a string',
    }),
  content: joi.string()
    .messages({
      'string.base': '"content" must be a string',
    }),
};
