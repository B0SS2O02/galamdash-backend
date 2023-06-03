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
    await queryInterface.bulkInsert('Users', [{
      nick: 'Galamdash',
      name: "",
      surname: "",
      img: '',
      info: 'info',
      email: 'admin',
      password: '$2b$10$7ZC9s3ANd7OU2qdqDEIAf.QLvFY8zTWmbTRyj1Tu4tM6BvbuHCQI.',
      type: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      nick: 'user',
      name: "",
      surname: "",
      img: '',
      info: 'info',
      email: 'example@mail.com',
      password: '$2b$10$7ZC9s3ANd7OU2qdqDEIAf.QLvFY8zTWmbTRyj1Tu4tM6BvbuHCQI.',
      type: 0,
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
    await queryInterface.bulkDelete('Users', null, {});
  }
};
