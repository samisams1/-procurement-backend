'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'companies',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: 'users',
              schema: 'et_proforma',
            },
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        email: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        address: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        phonenumber: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        country: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        city: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        houseNumber: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        contactNumber: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        specificName: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        subCity: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        isVerified: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
      },
      {
        schema: 'et_proforma',
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('companies');
  },
};