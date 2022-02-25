const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Token.init({
    user_id: DataTypes.INTEGER,
    refreshToken: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};
