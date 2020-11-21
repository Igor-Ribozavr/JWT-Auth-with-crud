const Joi = require('@hapi/joi');

const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(12).required(),
  lastName: Joi.string().min(2).max(12).required(),
  passport: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  email: Joi.string().email().lowercase().required(),
});

const loginSchema = Joi.object({
  passport: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  email: Joi.string().email().lowercase().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
