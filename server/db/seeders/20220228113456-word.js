const { Word } = require('../models');
const dictionaryDef = require('../../dictionaries/dictionaryWithDefinition');

module.exports = {
  async up(queryInterface, Sequelize) {
    for (let i = 0; i < dictionaryDef.length; i += 1) {
      await queryInterface.bulkInsert('Words', [{
        value: dictionaryDef[i][0],
        definition: dictionaryDef[i][1],
        language_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Words', null, {});
  },
};
