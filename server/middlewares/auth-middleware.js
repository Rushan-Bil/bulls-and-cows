/* eslint-disable consistent-return */
const ApiError = require('../exeptions/apiError');
const tokenService = require('../service/token-service');

module.exports = function (req, res, next) {
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
      console.log('не тот токен в локал стораже----------', userData);
      return next(ApiError.UnauthorizedError());
    }
    req.user = userData;
    next();
  } catch (error) {
    console.log('===============================================', error);
    return next(ApiError.UnauthorizedError());
  }
  console.log('EXIT FROM AUTHMIDDLEWARE');
};
