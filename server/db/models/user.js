const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasOne(models.Token, { foreignKey: 'user_id' });
      this.belongsToMany(models.Game, { through: 'GamesAndUser', foreignKey: 'user_id' });
      this.hasMany(models.Gamestate, { foreignKey: 'user_id' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    photo: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    activationLink: DataTypes.STRING,
    isActivated: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
