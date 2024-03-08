"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
const model_1 = __importDefault(require("../Quotation/model"));
const model_2 = __importDefault(require("../product/model"));
class ProductPrice extends sequelize_1.Model {
}
ProductPrice.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    disCountPrice: {
        type: sequelize_1.DataTypes.FLOAT,
    },
    quotationId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: 'pending',
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
}, {
    sequelize: database_1.default,
    modelName: 'ProductPrice',
    tableName: 'productPrices',
    schema: 'et_proforma', // Replace 'et_proforma' with your schema name
});
ProductPrice.belongsTo(model_1.default, {
    foreignKey: 'quotationId',
    as: 'quotation',
});
ProductPrice.belongsTo(model_2.default, {
    foreignKey: 'productId',
    as: 'product',
});
exports.default = ProductPrice;
