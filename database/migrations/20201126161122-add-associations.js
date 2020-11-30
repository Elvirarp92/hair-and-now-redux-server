'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('UsersSalons', {
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
      userId: { type: Sequelize.INTEGER, primaryKey: true },
      salonId: { type: Sequelize.INTEGER, primaryKey: true },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UsersSalons')
  },
}
