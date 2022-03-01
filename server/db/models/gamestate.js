const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Gamestate extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Gamestate.init({
    state: DataTypes.JSONB,
    user_id: DataTypes.INTEGER,
    page: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Gamestate',
  });
  return Gamestate;
};
