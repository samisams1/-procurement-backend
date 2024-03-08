'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'purchaseRequests',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('now'),
        },
        categoryId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('now'),
          onUpdate: Sequelize.fn('now'),
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        status: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'pending',
        },
        remark: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: 'NA',
        },
        addressDetail: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: 'NA',
        },
        requestedBy: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        approvedBy: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        estimatedDelivery: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: 'NA',
        },
        imageUrl: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        referenceNumber: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: 'NA',
        },
      },
      {
        schema: 'et_proforma',
      }
    );

  
    
  },

  
  down: async (queryInterface, Sequelize) => {
  },
};