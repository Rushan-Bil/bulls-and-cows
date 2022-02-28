const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Gamestate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.User, { foreignKey: 'user_id' });
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
