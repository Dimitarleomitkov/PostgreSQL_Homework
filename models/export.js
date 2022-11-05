'use strict';
const { Model } = require('sequelize');

const { Stock } = require('./stock');
module.exports = (sequelize, DataTypes) => {
  class Export extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Export.belongsTo(models.Stock, {foreignKey: 'stock_fk_id'});
    }
  }
  Export.init(
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
    }
  },
  {
    sequelize,
    modelName: 'Export',
    timestamps: false
  });
  return Export;
};