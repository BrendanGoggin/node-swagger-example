const createError = require('http-errors');

const getOffsetAndLimit = req => {
  let offset = 0;
  let limit = 10;
  if (req.query.limit) {
    limit = parseInt(req.query.limit);
    if (isNaN(limit) || limit < 0 || limit > 500) throw createError(400);
  }
  if (req.query.offset) {
    offset = parseInt(req.query.offset);
    if (isNaN(offset) || offset < 0) throw createError(400);
  }
  return {
    offset,
    limit,
  }
}

module.exports = { getOffsetAndLimit };
