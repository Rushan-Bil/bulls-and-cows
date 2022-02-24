/* eslint-disable class-methods-use-this */
const jwt = require('jsonwebtoken');
const { Token } = require('../db/models');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
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
    console.log('TOKEN after created-----', token);
    return token;
  }
}
module.exports = new TokenService();
