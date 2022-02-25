/* eslint-disable consistent-return */
const ApiError = require('../exeptions/apiError');
const tokenService = require('../service/token-service');
const { User } = require('../db/models');

module.exports = async function (req, res, next) {
  try {
    console.log('\n IN AUTHMIDDLEWARE+++++++++++++++++++++++++++++++++++++++++', '\n');
    const { refreshToken } = req.cookies;
    const tokenFromDB = await tokenService.findToken(refreshToken);
    const user = await User.findOne({ where: { id: tokenFromDB.user_id }, raw: true });
    console.log('\n IN AUTHMIDDLEWARE+++++++++++++++++++++++++++++++++', user.isActivated, '\n');

    const authorizationHeader = req.headers.authorization;
    if (!user.isActivated) {
      return next(ApiError.notActiavteMail());
    }
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
    console.log('===============================================', error);
    return next(ApiError.UnauthorizedError());
  }
  console.log('EXIT FROM AUTHMIDDLEWARE');
};
