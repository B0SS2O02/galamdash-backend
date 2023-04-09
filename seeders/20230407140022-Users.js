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
      img: '/public/images/03a05059cbfbc4ed313162fff2476111.webp',
      info: 'info',
      email: 'admin',
      password: '$2b$10$7ZC9s3ANd7OU2qdqDEIAf.QLvFY8zTWmbTRyj1Tu4tM6BvbuHCQI.',
      type: 3,
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
