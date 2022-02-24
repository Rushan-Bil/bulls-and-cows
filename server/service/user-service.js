/* eslint-disable class-methods-use-this */
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const { User } = require('../db/models');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user_dtos');

class UserService {
  async registration(name, email, password) {
    console.log('UserService.registration-------------', name, email, password);
    const candidate = await User.findOne({ where: { email }, raw: true });
    console.log('candidate--------------', candidate);
    if (candidate) {
      console.log(`Пользователь с таким ${email} майл уже существует`);
      throw new Error(`Пользователь с таким ${email} майл уже существует`);
    }
    const hashPassword = await bcrypt.hash(password, 3); // hash password
    const activationLink = uuid.v4(); // return random string
    console.log('hashPassword-activationLink', hashPassword, activationLink);
    const user = await User.create({
      name, email, password: hashPassword, activationLink,
    });
    console.log('user created', user);

    mailService.sendActivetionMail(email, activationLink);
    const userDto = new UserDto(user.dataValues);
    console.log(userDto);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    console.log('exit from USER SERVICE REGISTRATION----', { ...tokens, user: userDto });
    return { ...tokens, user: userDto };
  }
}
module.exports = new UserService();
