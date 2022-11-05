'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Warehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Warehouse.init(
    {
      address: {
          type: DataTypes.STRING,
          allowNull: false
      },
      size: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      hazard: {
          type: DataTypes.BOOLEAN,
          allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Warehouse',
      timestamps: false
    }
  );
  return Warehouse;
};