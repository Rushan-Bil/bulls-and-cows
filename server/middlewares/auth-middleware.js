/* eslint-disable consistent-return */
const ApiError = require('../exeptions/apiError');
const tokenService = require('../service/token-service');

module.exports = function (req, res, next) {
  console.log('IN AUTHMIDDLEWARE');
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }
    req.user = userData;
    next();
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
  console.log('EXIT FROM AUTHMIDDLEWARE');
};
