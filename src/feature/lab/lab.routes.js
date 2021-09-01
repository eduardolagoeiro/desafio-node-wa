const { ObjectId } = require('mongoose').Types;
const router = require('express').Router();
const { celebrate, Segments } = require('celebrate');
const labSchema = require('./lab.validationSchema');
const LabModel = require('./lab.model');
const ValidationSchema = require('../../helpers/ValidationSchema');
const StatusError = require('../../helpers/StatusError');

router.post('/',
  celebrate({
    [Segments.BODY]: labSchema.create,
  }), async (req, res, next) => {
    try {
      return res.send(await LabModel.create(req.body));
    } catch (error) {
      return next(error);
    }
  });

router.get('/actives', async (req, res, next) => {
  try {
    return res.send(await LabModel.find({ isActive: true }));
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

router.delete('/:id',
  async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) return next(new StatusError('not found', 404));

      const document = await LabModel.findById(id);

      if (!document) return next(new StatusError('not found', 404));

      document.set('isActive', false);

      await document.save();

      return res.send(document);
    } catch (error) {
      return next(error);
    }
  });

module.exports = router;
