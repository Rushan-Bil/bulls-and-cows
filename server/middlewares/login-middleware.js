/* eslint-disable consistent-return */
const ApiError = require('../exeptions/apiError');
const { User } = require('../db/models');

module.exports = async function (req, res, next) {
  try {
    const user = await User.findOne({ where: { email: req.body.email }, raw: true });
    console.log('\n USER IN AUTHMIDDLEWARE++++++++++++++++', user, '\n');

    const authorizationHeader = req.headers.authorization;
    console.log('\n IN AUTHMIDDLEWARE+++++++++++++++++++++++++++++++++', authorizationHeader, '\n');
    if (!user.isActivated) {
      return next(ApiError.notActiavteMail());
    }
    next();
  } catch (error) {
    console.log('===============================================', error);
    return next(ApiError.UnauthorizedError());
  }
};
