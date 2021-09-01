const { Joi } = require('celebrate');

module.exports = {
  ObjectId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  forbiddenSchema: Joi.object().keys({
    _id: Joi.forbidden(),
    __v: Joi.forbidden(),
    updatedBy: Joi.forbidden(),
    updatedAt: Joi.forbidden(),
    createdBy: Joi.forbidden(),
    createdAt: Joi.forbidden(),
  }).unknown(true),
};
