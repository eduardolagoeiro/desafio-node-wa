const router = require('express').Router();
const { errors } = require('celebrate');

const examRouter = require('./feature/exam/exam.router');
const labRouter = require('./feature/lab/lab.router');

router.use('/exam', examRouter);
router.use('/lab', labRouter);

router.use(errors());

module.exports = router;
