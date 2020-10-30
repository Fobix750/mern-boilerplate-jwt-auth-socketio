const Joi = require('joi');

const registerSchema = Joi.object().keys({
  username: Joi.string()
    .trim()
    .min(2)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/)
    .required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(6).max(20).required()
});

const loginSchema = Joi.object().keys({
  username: Joi.string()
    .trim()
    .min(2)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/)
    .required(),
  password: Joi.string().trim().min(6).max(20).required()
});

module.exports = { loginSchema, registerSchema };
