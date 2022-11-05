'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Warehouses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      address: {
          type: Sequelize.STRING,
          allowNull: false
      },
      size: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      hazard: {
          type: Sequelize.BOOLEAN,
          allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Warehouses');
  }
};