'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const certificates = [
      {store_title: 'ПЕРВЫЙ ГИПЕПРМАРКЕТ МЕБЕЛИ', description: 'Сертификат на скидку при покупке в магазине "ПЕРВЫЙ ГИПЕПРМАРКЕТ МЕБЕЛИ"', sum: 300, image: 'https://cdn.1hmm.ru/upload/iblock/51b/98344b9d-2bda-11e6-80cc-00155d000e07.png', quantity: 2},
      {store_title: 'AutoSpa', description: 'Бесплатное предоставление услуг автомойки "AutoSpa" по сертификату в объёме указанной суммы.',sum: 150, image: 'https://bronk.club/uploads/posts/2023-02/1677555085_bronk-club-p-pozdravleniya-avtosalonu-krasivo-72.jpg', quantity: 10},
      {store_title: 'Янтарная королева',  description: 'Сертификат на скидку при покупке в магазине "Янтарная королева"', sum: 200, image: 'https://corolewa.com/wa-data/public/shop/img/sertifikat-4-1.jpg', quantity: 5},
      {store_title: 'Fitlife',  description: 'Бесплатное предоставление услуг студии фитнеса "Fitlife" по сертификату в объёме указанной суммы.', sum: 100, image: 'https://fitlife62.ru/image/catalog/gift_card/GIFT%204-r3.jpg', quantity: 20},
      {store_title: 'WILMAX England',  description: 'Сертификат на скидку при покупке в магазине посуды "WILMAX England"', sum: 50, image: 'https://prostodar.ru/wp-content/uploads/2019/12/Frame-76-1.png', quantity: 30},
      {store_title: 'МЕБЕЛЬОПТТОРГ',  description: 'Сертификат на скидку при покупке в мебельном магазине "МЕБЕЛЬОПТТОРГ"', sum: 250, image: 'https://nvmebel.ru/upload/iblock/8c5/8c53409f0b312c7bd3114356b2855d29.jpg', quantity: 10},
      {store_title: 'Иванка',  description: 'Сертификат на скидку при покупке в магазине одежды "Иванка"', sum: 300, image: 'https://static-eu.insales.ru/images/products/1/3364/139627812/Ivanka_sertifikat3.jpg', quantity: 7},
      {store_title: 'МУЖСКИЕ РУБАШКИ.РУ',  description: 'Сертификат на скидку при покупке в магазине "МУЖСКИЕ РУБАШКИ.РУ"', sum: 400, image: 'https://rubashki-muzhskie.ru/images/shop_items/419224.jpg', quantity: 8},
      {store_title: 'BELATON',  description: 'Сертификат на скидку при покупке в обувном магазине "BELATON"', sum: 300, image: 'https://sun9-58.userapi.com/impf/c836632/v836632542/6eb8f/fbdneiEwEgc.jpg?size=604x427&quality=96&sign=6c84ec18cbd1500d662b2a966d942942&type=album', quantity: 2},
      {store_title: 'Зоомагазин "Хомка"',  description: 'Сертификат на скидку при покупке в зоомагазине "Хомка"', sum: 50, image: 'https://grizly.club/uploads/posts/2022-12/1670155737_grizly-club-p-shablon-sertifikat-na-summu-1.jpg', quantity: 15},
    ]
  
     

      await queryInterface.bulkInsert('Certificates', certificates, {});
    
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Certificates', null, {});
     
  }
};
