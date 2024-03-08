"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class Company extends sequelize_1.Model {
}
Company.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    address: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    phonenumber: {
        type: sequelize_1.DataTypes.STRING(255),
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
    country: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    city: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    houseNumber: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    contactNumber: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    specificName: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    subCity: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    isVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Company',
    tableName: 'companies',
    schema: 'et_proforma',
});
exports.default = Company;
