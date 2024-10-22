'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('Users', [{
       fio: 'Бегинс Фродо Бильбович',
       date_of_birth: new Date(),
       email: 'test1@gmail.com',
       password: '123456',
       phone: '+79228118215',
       createdAt: new Date(),
       updatedAt: new Date(),
     },
       {
         fio: 'Иванов Иван Иванович',
         date_of_birth: new Date(),
         email: 'test2@gmail.com',
         password: '1',
         phone: '+8418515351',
         createdAt: new Date(),
         updatedAt: new Date(),
       }], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('User', null, {});
  }
};
