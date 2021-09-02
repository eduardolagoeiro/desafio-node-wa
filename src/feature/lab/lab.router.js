const { ObjectId } = require('mongoose').Types;
const router = require('express').Router();
const { celebrate, Segments, Joi } = require('celebrate');
const labSchema = require('./lab.validationSchema');
const LabModel = require('./lab.model');
const ValidationSchema = require('../../helpers/ValidationSchema');
const StatusError = require('../../helpers/StatusError');

router.post('/',
  celebrate({
    [Segments.BODY]: Joi.alternatives()
      .try(labSchema.create, Joi.array().items(labSchema.create).min(1)),
  }), async (req, res, next) => {
    try {
      return res.send(await LabModel.create(req.body));
    } catch (error) {
      return next(error);
    }
  });

router.get('/', async (req, res, next) => {
  try {
    const where = typeof req.query.where === 'object' ? req.query.where : {};
    return res.send(await LabModel.find(where));
  } catch (error) {
    return next(error);
  }
});

router.patch('/:id',
  celebrate({
    [Segments.BODY]: ValidationSchema.forbiddenSchema,
  }),
  celebrate({
    [Segments.BODY]: labSchema.update,
  }),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) return next(new StatusError('not found', 404));

      const document = await LabModel.findById(id);

      if (!document) return next(new StatusError('not found', 404));

      Object.keys(req.body).forEach((key) => {
        document.set(key, req.body[key]);
      });

      await document.save();

      return res.send(document);
    } catch (error) {
      return next(error);
    }
  });

router.patch('/',
  celebrate({
    [Segments.BODY]: ValidationSchema.forbiddenSchema,
  }),
  celebrate({
    [Segments.BODY]: labSchema.update,
  }),
  async (req, res, next) => {
    try {
      const result = await LabModel.updateMany(req.body);

      return res.send(result);
    } catch (error) {
      return next(error);
    }
  });

module.exports = router;
