"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
const model_1 = __importDefault(require("../supplier/model"));
const model_2 = __importDefault(require("../user/model"));
class Order extends sequelize_1.Model {
}
Order.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    customerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    supplierId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    totalPrice: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    tax: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
    shippingCost: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    referenceNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: 'NA',
    },
    purchaseRequestId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Order',
    tableName: 'orders',
    schema: 'et_proforma',
});
Order.belongsTo(model_1.default, { foreignKey: 'supplierId', as: 'supplier' });
Order.belongsTo(model_2.default, { foreignKey: 'customerId', as: 'customer' });
exports.default = Order;
