/* eslint-disable class-methods-use-this */
const { validationResult } = require('express-validator');
const userService = require('../service/user-service');

class UserController {
  async registration(req, res, next) {
    try {
      const { name, email, password } = req.body;
      console.log('UserController.registration-------', name, email, password);
      const userData = await userService.registration(name, email, password);
      console.log('userData--------------------');
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.json(userData);
    } catch (e) {
      console.log(e);
    }
  }

  async login(req, res, next) {
    try {

    } catch (e) {

    }
  }

  async logout(req, res, next) {
    try {

    } catch (e) {

    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      console.log(e);
    }
  }

  async refresh(req, res, next) {
    try {

    } catch (e) {

    }
  }
}

module.exports = new UserController();
