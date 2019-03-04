const winston = require('winston');

/**
 * using the default npm levels, as shown here:
 * https://github.com/winstonjs/winston#logging-levels
 */
const LOG_LEVELS = {
  error: 'error',
  warn: 'warn',
  info: 'info',
  verbose: 'verbose',
  debug: 'debug',
  silly: 'silly',
};

// log to stdout in json format
const logger = winston.createLogger({
  level: LOG_LEVELS.debug,
  format: winston.format.json(),
  defaultMeta: { service: 'todo' },
  transports: [
    new winston.transports.Console({ format: winston.format.json() }),
  ],
});

// middleware: monkeypatch res.send() to log response info before running
const responseLoggerMiddleware = (req, res, next) => {
  const oldSend = res.send;

  res.send = (...args) => {
    // determine log level based on http status code
    let logLevel = LOG_LEVELS.error;
    if (res.statusCode < 400) {
      logLevel = LOG_LEVELS.info;
    } else if (res.statusCode < 500) {
      logLevel = LOG_LEVELS.warn;
    }

    // log http response info
    logger.log(logLevel, {
      httpStatusCode: res.statusCode,
      protocol: req.protocol,
      httpMethod: req.method,
      path: req.originalUrl,
      timestamp: new Date().toISOString(),
    });

    // call the orginal res.send()
    return oldSend.apply(res, args);
  };
  next();
};

module.exports = {
  logger,
  responseLoggerMiddleware,
};
