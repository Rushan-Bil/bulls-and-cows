/* eslint-disable class-methods-use-this */
const jwt = require('jsonwebtoken');
const { Token } = require('../db/models');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30s' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({ where: { user_id: userId }, raw: true });
    let token;
    if (tokenData) {
      await Token.update({ refreshToken }, {
        where: {
          id: tokenData.id,
        },
      });
    } else {
      token = await Token.create({ user_id: userId, refreshToken });
    }
    console.log('TOKEN after created-----');
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await Token.destroy({ where: { refreshToken } });
    console.log('Token deleted-------------------------', tokenData);
    return tokenData;
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async findToken(refreshToken) {
    const tokenData = await Token.findOne({ where: { refreshToken }, raw: true });
    return tokenData;
  }
}
module.exports = new TokenService();
