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
    await queryInterface.bulkInsert('TagLists', [{
      title: 'A',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'B',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'C',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'D',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'F',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'G',
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
    await queryInterface.bulkDelete('TagLists', null, {});
  }
};
