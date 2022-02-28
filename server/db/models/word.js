const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Word extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Language, { foreignKey: 'language_id' });
    }
  }
  Word.init({
    value: DataTypes.STRING,
    definition: DataTypes.TEXT,
    language_id: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Word',
  });
  return Word;
};
