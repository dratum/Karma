'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fio: {
        // allowNull: false,
        type: Sequelize.STRING
      },
      date_of_birth: {
        // allowNull: false,
        type: Sequelize.DATEONLY
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone: {
        // allowNull: false,
        type: Sequelize.STRING
      },
      isActivated: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      activationLink: {
        type: Sequelize.STRING
      },
      scores: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};