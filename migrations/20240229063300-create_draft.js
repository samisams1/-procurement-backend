'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'drafts',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Description: {
          type: Sequelize.STRING,
        },
        code: {
          type: Sequelize.STRING,
        },
        manufacturer: {
          type: Sequelize.STRING,
        },
        mark: {
          type: Sequelize.STRING,
        },
        imageUrl: {
          type: Sequelize.TEXT, // Updated data type to TEXT
        },
        model: {
          type: Sequelize.STRING,
        },
        partNumber: {
          type: Sequelize.STRING,
        },
        quantity: {
          type: Sequelize.STRING,
        },
        uom: {
          type: Sequelize.STRING,
        },
        attachement:{
          type: Sequelize.TEXT,
        },
        deliveryDate: {
          type: Sequelize.STRING,
        },
        supplier:{
          type: Sequelize.STRING,
        },
        categoryId:{
          type: Sequelize.INTEGER,
        },
        remark:{
          type: Sequelize.STRING,
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('now'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('now'),
          onUpdate: Sequelize.fn('now'),
        },
      },
      {
        schema: 'et_proforma',
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('drafts');
  },
};