/* eslint-disable class-methods-use-this */
const { validationResult } = require('express-validator');

class UserController {
  async registration(req, res, next) {
    try {
       res.json([123, 23]);
    } catch (e) {
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

    } catch (e) {

    }
  }

  async refresh(req, res, next) {
    try {

    } catch (e) {

    }
  }
}

module.exports = new UserController();
