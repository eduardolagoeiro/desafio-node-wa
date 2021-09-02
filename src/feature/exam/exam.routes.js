const { ObjectId } = require('mongoose').Types;
const router = require('express').Router();
const { celebrate, Segments, Joi } = require('celebrate');
const examSchema = require('./exam.validationSchema');
const ExamModel = require('./exam.model');
const ValidationSchema = require('../../helpers/ValidationSchema');
const StatusError = require('../../helpers/StatusError');
const LabModel = require('../lab/lab.model');

router.post('/',
  celebrate({
    [Segments.BODY]: Joi.alternatives()
      .try(examSchema.create, Joi.array().items(examSchema.create).min(1)),
  }), async (req, res, next) => {
    try {
      return res.send(await ExamModel.create(req.body));
    } catch (error) {
      return next(error);
    }
  });

router.get('/', async (req, res, next) => {
  try {
    const where = typeof req.query.where === 'object' ? req.query.where : {};
    return res.send(await ExamModel.find(where).populate(req.query.populate));
  } catch (error) {
    return next(error);
  }
});

router.patch('/:id',
  celebrate({
    [Segments.BODY]: ValidationSchema.forbiddenSchema,
  }),
  celebrate({
    [Segments.BODY]: examSchema.update,
  }),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) return next(new StatusError('not found', 404));

      const exam = await ExamModel.findById(id);

      if (!exam) return next(new StatusError('not found', 404));

      Object.keys(req.body).forEach((key) => {
        exam.set(key, req.body[key]);
      });

      await exam.save();

      return res.send(exam);
    } catch (error) {
      return next(error);
    }
  });

router.patch('/',
  celebrate({
    [Segments.BODY]: ValidationSchema.forbiddenSchema,
  }),
  celebrate({
    [Segments.BODY]: examSchema.update,
  }),
  async (req, res, next) => {
    try {
      const result = await ExamModel.updateMany(req.body);

      return res.send(result);
    } catch (error) {
      return next(error);
    }
  });

async function getActiveExam(id) {
  if (!ObjectId.isValid(id)) throw new StatusError('exam not found', 404);

  const exam = await ExamModel.findById(id);

  if (!exam) throw new StatusError('exam not found', 404);

  if (exam.status !== 'active') throw new StatusError('exam not active', 400);

  return exam;
}

async function getActiveLab(id) {
  if (!ObjectId.isValid(id)) throw new StatusError('lab not found', 404);

  const lab = await LabModel.findById(id);

  if (!lab) throw new StatusError('lab not found', 404);

  if (lab.status !== 'active') throw new StatusError('lab not active', 400);

  return lab;
}

router.get('/:id/labs',
  async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) return next(new StatusError('not found', 404));

      const exam = await ExamModel.findById(id);

      if (!exam) return next(new StatusError('not found', 404));

      if (exam.labs.lenght === 0) return [];

      const labs = await LabModel.find({ _id: {
        $in: exam.labs,
      } });

      return res.send(labs);
    } catch (error) {
      return next(error);
    }
  });

router.put('/:id/labs/:labId',
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const exam = await getActiveExam(id);

      const { labId } = req.params;

      const lab = await getActiveLab(labId);

      if (exam.labs.includes(lab._id)) {
        return res.send(exam);
      }

      exam.set('labs', [...exam.labs, lab._id]);

      await exam.save();

      return res.send(exam);
    } catch (error) {
      return next(error);
    }
  });

router.delete('/:id/labs/:labId',
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const exam = await getActiveExam(id);

      const { labId } = req.params;

      const lab = await getActiveLab(labId);

      if (!exam.labs.includes(lab._id) || exam.labs.lenght === 0) {
        return res.send(exam);
      }

      exam.set('labs', exam.labs.filter(examLabId => examLabId.toString() !== labId));

      await exam.save();

      return res.send(exam);
    } catch (error) {
      return next(error);
    }
  });

module.exports = router;
