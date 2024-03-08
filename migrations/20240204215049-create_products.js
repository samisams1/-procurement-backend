'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create the 'products' table
    await queryInterface.createTable(
      'products',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        purchaseRequestId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'purchaseRequests',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
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

    // Add foreign key constraints if they don't already exist
    const [constraintExists] = await queryInterface.sequelize.query(`
      SELECT constraint_name
      FROM information_schema.table_constraints
      WHERE constraint_name = 'fk_purchaseRequests_products_new'
        AND table_name = 'products'
    `);

    if (!constraintExists) {
      await queryInterface.addConstraint('products', {
        fields: ['purchaseRequestId'],
        type: 'foreign key',
        name: 'fk_purchaseRequests_products_new',
        references: {
          table: 'purchaseRequests',
          field: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }

    /*await queryInterface.addConstraint('products', {
      fields: ['quotationId'],
      type: 'foreign key',
      name: 'fk_products_quotations',
      references: {
        table: 'quotations',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }); */
  },

  down: async (queryInterface, Sequelize) => {
    // Remove foreign key constraints
    await queryInterface.removeConstraint('products', 'fk_purchaseRequests_products_new');
    await queryInterface.removeConstraint('products', 'fk_products_quotations');

    // Drop the 'products' table
    await queryInterface.dropTable('products');
  },
};