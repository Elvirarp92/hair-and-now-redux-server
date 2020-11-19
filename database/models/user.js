'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        validate: { isEmail: true },
        allowNull: false,
        unique: true,
      },
      first_name: { type: DataTypes.STRING, allowNull: false },
      last_name: { type: DataTypes.STRING, allowNull: false },
      is_active: { type: DataTypes.BOOLEAN, defaultValue: false },
      password: { type: DataTypes.STRING },
      confirmation_code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  )
  return User
}
