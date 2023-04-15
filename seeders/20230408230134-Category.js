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
    await queryInterface.bulkInsert('Categories', [{
      title: "Ceper eser",
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: "Omri we doredijiligi",
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: "Proza",
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: "SHygyr",
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
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
