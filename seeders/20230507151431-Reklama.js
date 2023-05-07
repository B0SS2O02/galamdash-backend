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
    await queryInterface.bulkInsert('Reklamas', [{
      img: 'public/images/default_avatar.jpg',
      link: 'example',
      position: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      img: 'public/images/default_avatar.jpg',
      link: 'example',
      position: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      img: 'public/images/default_avatar.jpg',
      link: 'example',
      position: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      img: 'public/images/default_avatar.jpg',
      link: 'example',
      position: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      img: 'public/images/default_avatar.jpg',
      link: 'example',
      position: 2,
      createdAt: new Date(),  
      updatedAt: new Date(),
    },{
      img: 'public/images/default_avatar.jpg',
      link: 'example',
      position: 2,
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
    await queryInterface.bulkDelete('Reklamas', null, {});
  }
};
