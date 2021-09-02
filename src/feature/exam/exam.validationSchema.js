const { Joi } = require('celebrate');

const type = Joi.string().valid('clinic_analysis', 'image');

module.exports = {
  create: Joi.object().keys({
    name: Joi.string().required(),
    type: type.required(),
  }),
  update: Joi.object().keys({
    name: Joi.string().optional(),
    type: type.optional(),
    status: Joi.string().valid('active', 'inactive').optional(),
  }),
};
