/* eslint-disable no-unused-vars */
const ApiError = require('../exeptions/apiError');

module.exports = function (err, req, res, next) {
  console.log(err);
  if (err instanceof ApiError) {
    return res.status(err.status).json({ messahe: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: 'Непредвиденная ошибка' });
};