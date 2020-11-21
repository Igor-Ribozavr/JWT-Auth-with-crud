const Joi = require('@hapi/joi');

const createSchema = Joi.object({
  title: Joi.string().min(2).max(12).required(),
  amount: Joi.number().min(1).max(1000).required(),
});

const updateSchema = Joi.object({
  title: Joi.string().min(2).max(12).required(),
  amount: Joi.number().min(1).max(1000).required(),
});
module.exports = {
  createSchema,
  updateSchema,
};
