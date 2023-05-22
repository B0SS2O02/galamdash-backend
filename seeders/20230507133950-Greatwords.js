'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Greatwords', [{
      content: 'Example',
      avtor: 'Avtor ',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      content: 'Example2',
      avtor: 'Avtor2',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      content: 'Example3',
      avtor: 'Avtor3',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      content: 'Example4',
      avtor: 'Avtor4',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Greatwords', null, {});
  }
};
