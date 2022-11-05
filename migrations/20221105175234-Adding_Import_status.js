'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Imports', 'is_exported',
      {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      }
      );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Imports', 'is_exported');
  }
};