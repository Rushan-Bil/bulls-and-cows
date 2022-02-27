/* eslint-disable no-unused-vars */
const ApiError = require('../exeptions/apiError');

module.exports = function (err, req, res, next) {
  console.log(err);
  if (err instanceof ApiError) {
    console.log('Error-middleware================================', err);
    return res.status(err.status).json({ payload: err });
  }
  return res.status(500).json({ message: 'Непредвиденная ошибка' });
};
