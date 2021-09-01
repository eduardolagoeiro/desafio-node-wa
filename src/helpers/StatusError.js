class StatusError extends Error {
  constructor(message, code, errorCodes) {
    super(message);
    if (code) this.status = code;
    if (errorCodes) this.codes = errorCodes;
    Error.captureStackTrace(this, StatusError);
  }
}

module.exports = StatusError;
