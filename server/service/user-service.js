/* eslint-disable class-methods-use-this */
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const { User } = require('../db/models');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user_dtos');
const ApiError = require('../exeptions/apiError');

class UserService {
  async registration(name, email, password) {
    console.log('UserService.registration-------------', name, email, password);
    const candidate = await User.findOne({ where: { email }, raw: true });
    console.log('candidateFindOne--------------');
    if (candidate) {
      console.log(`Пользователь с таким ${email} майл уже существует`);
      throw ApiError.BadREquest(`Пользователь с таким ${email} майл уже существует`);
    }
    const hashPassword = await bcrypt.hash(password, 3); // hash password
    const activationLink = uuid.v4(); // return random string
    console.log('hashPassword-activationLink--------', hashPassword, activationLink);
    const user = await User.create({
      name, email, password: hashPassword, activationLink, isActivated: false,
    });
    console.log('user created');

    mailService.sendActivetionMail(email, `${process.env.API_URL}/user/activate/${activationLink}`);
    const userDto = new UserDto(user.dataValues);
    console.log(userDto);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    console.log('exit from USER SERVICE REGISTRATION----');
    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    console.log('get activationLink---------------', activationLink);
    const user = await User.findOne({ where: { activationLink }, raw: true });
    if (!user) {
      throw ApiError.BadREquest('Некорректная ссылка активации');
    }
    await User.update({ isActivated: true }, {
      where: {
        activationLink,
      },
    });
    console.log(' activationLink---------------updatedt');
  }

  async login(email, password) {
    console.log('UserService.login-------------', email, password);
    const user = await User.findOne({ where: { email }, raw: true });
    if (!user) {
      console.log('Пользователь с таким  майл не найден');
      throw ApiError.BadREquest('Пользователь с таким не найден');
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadREquest('Неправильный пароль');
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    console.log('exit from USER SERVICE LOGIN----');
    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    console.log('INSERT INTO REFRESH--------------------------------------------', refreshToken);
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError();
    }
    const user = await User.findOne({ where: { id: userData.id }, raw: true });
    console.log('IN REFRESH email------------------------------', user);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    console.log('exit from USER SERVICE REFRESH----', { ...tokens, user: userDto });
    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    const users = await User.findAll({ order: [['rating', 'DESC']] });
    return users;
  }

  async addAvatar(title, id) {
    console.log('ADDAVATAR');
    const img = await User.update({ photo: `/img/${title}` }, {
      where: {
        id,
      },
    });
    return img;
  }
}
module.exports = new UserService();
