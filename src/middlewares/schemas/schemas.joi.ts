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
      'string.min': 'lastName is at least 3 characters long',
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

export const lint = 2;
