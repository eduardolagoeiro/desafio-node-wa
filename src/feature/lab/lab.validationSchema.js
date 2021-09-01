const { Joi } = require('celebrate');

module.exports = {
  create: Joi.object().keys({
    name: Joi.string().required(),
    address: Joi.string().required(),
  }),
  update: Joi.object().keys({
    name: Joi.string().optional(),
    address: Joi.string().optional(),
    status: Joi.string().valid('active', 'inactive'),
  }),
};
