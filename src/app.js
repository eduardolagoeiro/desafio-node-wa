const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const router = require('./router');

const StatusError = require('./helpers/StatusError');

const app = express();

app.use(cors());
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(morgan('tiny'));
app.use(express.json({ limit: '4mb' }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  next();
});

app.use(router);

app.use((req, res, next) => {
  next(new StatusError('Not Found', 404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    message: err.message,
    statusCode: err.status || 500,
    error: err.message,
    errorCodes: err.codes || [],
  });
  return next();
});

module.exports = app;
