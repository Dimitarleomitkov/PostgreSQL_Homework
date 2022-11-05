'use strict';
const { Model } = require('sequelize');
const { Product } = require('./product');
const { Warehouse } = require('./warehouse');
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Stock.belongsTo(models.Warehouse, {foreignKey: 'warehouse_fk_id'});
      Stock.belongsTo(models.Product, {foreignKey: 'product_fk_id'});
    }
  }
  Stock.init(
  {
    quantity:
    {
      type: DataTypes.INTEGER,
      allowNull: false
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
    product_fk_id:
    {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: 'id'
      }
    }
  },
  {
    sequelize,
    modelName: 'Stock',
    timestamps: false
  });
  return Stock;
};