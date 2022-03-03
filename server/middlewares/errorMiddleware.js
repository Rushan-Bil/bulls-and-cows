/* eslint-disable no-unused-vars */
const ApiError = require('../exeptions/apiError');

module.exports = function (err, req, res, next) {
  console.log(err);
  if (err instanceof ApiError) {
    console.log('Error-middleware================================', err.message);
    console.log('ОТПРАВКА ОШИБКИ');
    return res.status(err.status).json(err.message);
  }
  return res.status(500).json({ message: 'Непредвиденная ошибка' });
};
