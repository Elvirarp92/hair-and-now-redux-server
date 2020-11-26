'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Salon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Salon.belongsToMany(models.User, {
        through: 'UsersSalons',
        as: 'salon',
        foreignKey: 'salonId',
        otherKey: 'userId',
      })
    }
  }
  Salon.init(
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      street: { type: DataTypes.STRING, allowNull: false },
      number: { type: DataTypes.STRING, allowNull: false },
      zipcode: { type: DataTypes.STRING, allowNull: false },
      town: { type: DataTypes.STRING, allowNull: false },
      province: { type: DataTypes.STRING, allowNull: false },
      addressComplements: DataTypes.STRING,
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Salon',
    }
  )
  return Salon
}
