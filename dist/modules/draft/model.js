"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class Draft extends sequelize_1.Model {
}
Draft.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    purchaseRequestId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    Description: {
        type: sequelize_1.DataTypes.STRING,
    },
    code: {
        type: sequelize_1.DataTypes.STRING,
    },
    manufacturer: {
        type: sequelize_1.DataTypes.STRING,
    },
    mark: {
        type: sequelize_1.DataTypes.STRING,
    },
    imageUrl: {
        type: sequelize_1.DataTypes.TEXT,
    },
    model: {
        type: sequelize_1.DataTypes.STRING,
    },
    partNumber: {
        type: sequelize_1.DataTypes.STRING,
    },
    quantity: {
        type: sequelize_1.DataTypes.FLOAT,
    },
    uom: {
        type: sequelize_1.DataTypes.STRING,
    },
    attachement: {
        type: sequelize_1.DataTypes.TEXT,
    },
    deliveryDate: {
        type: sequelize_1.DataTypes.STRING,
    },
    supplier: {
        type: sequelize_1.DataTypes.STRING,
    },
    categoryId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    remark: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Draft',
    tableName: 'drafts',
    schema: 'et_proforma',
});
//Draft.belongsTo(PurchaseRequest, { foreignKey: 'PurchaseRequestId', as: 'drafts' });
exports.default = Draft;
