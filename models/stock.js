'use strict';
const { Model } = require('sequelize');
const { Product } = requre('./product');
const { Warehouse } = requre('./warehouse');
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
    }
  }
  Stock.init(
  {
    {
      quantity: DataTypes.INTEGER,
      allowNull: false
    },
    {
      warehouse_fk_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Warehouse,
          key: 'id'
        }
      },
      allowNull: false
    },
    {
      product_fk_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Product,
          key: 'id'
        }
      },
      allowNull: false
    },
    {
      sequelize,
      modelName: 'Stock',
    });
  return Stock;
};