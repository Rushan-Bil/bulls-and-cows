/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
const { validationResult } = require('express-validator');
const ApiError = require('../exeptions/apiError');
const userService = require('../service/user-service');

class UserController {
  async registration(req, res, next) {
    console.log('registration start---------------------------');
    try {
      const errors = validationResult(req);
      console.log('валидате errors=============================', errors.isEmpty());
      if (!errors.isEmpty()) {
        return next(ApiError.BadREquest('Ошибка при валидации', errors.array()));
      }
      const { name, email, password } = req.body;
      console.log('UserController.registration-------', name, email, password);
      const userData = await userService.registration(name, email, password);
      console.log('userData--------------------');
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {

    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {

    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {

    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
