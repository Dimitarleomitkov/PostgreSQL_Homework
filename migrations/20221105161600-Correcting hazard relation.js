'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Stocks', 'warehouse_fk_id');
    await queryInterface.addColumn('Imports', 'warehouse_fk_id',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: 'Warehouses'
          },
          key: 'id'
        }
      }
      );
    await queryInterface.addColumn('Exports', 'warehouse_fk_id',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: 'Warehouses'
          },
          key: 'id'
        }
      }
      );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Imports', 'warehouse_fk_id');
    await queryInterface.removeColumn('Exports', 'warehouse_fk_id');
    await queryInterface.addColumn('Stocks', 'warehouse_fk_id',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: 'Warehouses'
          },
          key: 'id'
        }
      }
      );
  }
};
