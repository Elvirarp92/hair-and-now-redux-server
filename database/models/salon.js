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
        as: 'users',
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
        validate: {
          is: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, //RegEx checks whether it's a valid phone number
        },
      },
    },
    {
      sequelize,
      modelName: 'Salon',
    }
  )
  return Salon
}
