'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Bids', [{
       title: 'Донести кольцо к роковой горе',
       description: 'Нужно навалять Саурону и оркам и уничтожить кольцо всевластия',
       address: 'г. Шир, ул. Кировская, д. 3',
       status: 'create',
       author_id: 2,
       createdAt: new Date(),
       updatedAt: new Date(),
     },
       {
         title: 'Нужно поймать кота',
         description: 'Кот бегает, не могу поймать, помогите',
         address: 'г. Санкт-Петербург, ул. Кировская, д. 15',
         status: 'create',
         author_id: 1,
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         title: 'Достать кошку с дерева',
         description: 'Кошечка залезла на дерево, не можем спустить',
         address: 'г. Черняховск, ул. Комсомольская, д. 9',
         status: 'create',
         author_id: 1,
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         title: 'Нужен иснструктор по вождению',
         description: 'Нужен инструктор по вождению, а денег нет. Хочу возить мужа в магазин за пивом)',
         address: 'г. Черняховск, ул. Комсомольская, д. 9',
         status: 'create',
         author_id: 1,
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         title: 'Помочь вынести старый диван на мусорку',
         description: 'Мне 89 лет, сам не подниму, а пенсия 12000р. На грузчиков денег нет, помогите пожалуйста.',
         address: 'г. Ярославль, ул. Ленина',
         status: 'create',
         author_id: 1,
         createdAt: new Date(),
         updatedAt: new Date(),
       },
     ], {});
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Bid', null, {});
  }
};
