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
  userId: joi.number().required().strict().integer()
    .messages({
      'any.required': 'userId is required',
    }),
  workspaceName: joi.string().min(1).required()
    .messages({
      'string.min': '"workspaceName" is at least 1 characters long',
      'any.required': 'workspaceName is required',
    }),
};

export const workspaceColumn = {
  workspaceId: joi.number().required().strict().integer()
    .messages({
      'any.required': 'workspaceId is required',
    }),
  title: joi.string().min(1).required()
    .messages({
      'string.min': '"title" is at least 1 characters long',
      'any.required': 'title is required',
    }),
};

export const workspaceCard = {
  columnId: joi.number().required().strict().integer()
    .messages({
      'any.required': 'columnId is required',
    }),
  title: joi.string().min(1).required()
    .messages({
      'string.min': '"title" is at least 1 characters long',
      'any.required': 'title is required',
    }),
  content: joi.string().min(1).required()
    .messages({
      'string.min': '"content" is at least 1 characters long',
      'any.required': 'content is required',
    }),
};
