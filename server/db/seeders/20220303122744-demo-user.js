module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Ivan',
        photo: '/img/download.jpeg',
        isActivated: true,
        rating: 23,
        createdAt: new Date(),
        updatedAt: new Date(),

      },
      {
        name: 'John Doe',
        photo: '/img/cat.jpeg',
        isActivated: true,
        rating: 29,
        createdAt: new Date(),
        updatedAt: new Date(),

      },
      {
        name: 'Artur',
        photo: '/img/download.jpeg',
        isActivated: true,
        rating: 3,
        createdAt: new Date(),
        updatedAt: new Date(),

      },
      {
        name: 'Vova',
        photo: '/img/PRI_207378542.jpg',
        isActivated: true,
        rating: 67,
        createdAt: new Date(),
        updatedAt: new Date(),

      },
      {
        name: 'Anna',
        photo: '/img/IMG_5014.JPG',
        isActivated: true,
        rating: 233,
        createdAt: new Date(),
        updatedAt: new Date(),

      },
      {
        name: 'Inna',
        photo: '/img/download.jpeg',
        isActivated: true,
        rating: 2,
        createdAt: new Date(),
        updatedAt: new Date(),

      },
      {
        name: 'Maria',
        photo: '/img/download.jpeg',
        isActivated: true,
        rating: 823,
        createdAt: new Date(),
        updatedAt: new Date(),

      },
      {
        name: 'Doe',
        photo: '/img/download.jpeg',
        isActivated: true,
        rating: 34,
        createdAt: new Date(),
        updatedAt: new Date(),

      },
      {
        name: 'Daria',
        photo: '/img/download.jpeg',
        isActivated: true,
        rating: 23,
        createdAt: new Date(),
        updatedAt: new Date(),

      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
