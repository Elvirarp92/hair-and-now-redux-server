'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersSalons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UsersSalons.belongsTo(models.User, {foreignKey: 'userId'})
      UsersSalons.belongsTo(models.Salon, {foreignKey: 'salonId'})

    }
  };
  UsersSalons.init({
    userId: DataTypes.UUID,
    salonId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'UsersSalons',
  });
  return UsersSalons;
};