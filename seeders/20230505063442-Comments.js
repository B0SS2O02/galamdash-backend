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
    await queryInterface.bulkInsert('Comments', [{
      post: 1,
      user: 1,
      content: "Blablablabla1",
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      post: 1,
      user: 2,
      content: "Blablablabla2",
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      post: 1,
      parent: 1,
      user: 1,
      content: "Blablablabla3",
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      post: 1,
      parent: 2,
      user: 1,
      content: "Blablablabla4",
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
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
