'use strict';
const {
  Model
} = require('sequelize');

const { Stock } = require('./stock');
const { Warehouse } = require('./warehouse');
module.exports = (sequelize, DataTypes) => {
  class Import extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Import.belongsTo(models.Stock, {foreignKey: 'stock_fk_id'});
      Import.belongsTo(models.Warehouse, {foreignKey: 'warehouse_fk_id'});
    }
  }
  Import.init(
  {
    date:
    {
      type: DataTypes.DATE,
      allowNull: false
    },
    stock_fk_id:
    {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Stock,
        key: 'id'
      }
    },
    warehouse_fk_id:
    {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Warehouse,
        key: 'id'
      }
    },
    is_exported:
    {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Import',
    timestamps: false
  });
  return Import;
};