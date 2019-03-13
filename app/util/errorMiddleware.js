const createError = require('http-errors');

const { logger } = require('./logger');

// middleware: set res status to 500 on errors
function errorMiddleware (err, req, res, next) {

  // express must handle case where response has started to be sent
  if (res.headersSent) {
    return next(err)
  }

  // handle HTTP errors normally
  if (err instanceof createError.HttpError) {
    res.sendStatus(err.statusCode);
    return;
  }

  // catch and handle errors with a stack trace and HTTP 500
  logger.error(err.stack);
  res.sendStatus(500);
}

module.exports = { errorMiddleware };
