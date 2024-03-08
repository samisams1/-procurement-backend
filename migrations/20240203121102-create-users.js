'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createSchema('et_proforma');

    await queryInterface.createTable(
      'users',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: Sequelize.STRING,
          unique: true,
        },
        firstName: {
          type: Sequelize.STRING,
        },
        lastName: {
          type: Sequelize.STRING,
        },
        phoneNumber: {
          type: Sequelize.STRING,
        },
        address: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
        },
        role: {
          type: Sequelize.ENUM('ADMIN', 'CUSTOMER', 'SUPPLIER'),
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('now'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('now'),
        },
        status: {
          type: Sequelize.STRING,
          defaultValue: 'PENDING',
        },
        isVerified: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        profilepicture: {
          type: Sequelize.STRING,
        },
      },
      {
        schema: 'et_proforma',
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
    await queryInterface.dropSchema('et_proforma');
  },
};