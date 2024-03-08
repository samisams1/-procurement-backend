"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class PasswordReset extends sequelize_1.Model {
    static associate(models) {
        // Define associations if needed
    }
}
PasswordReset.init({
    id: {
        allowNull: false,
        primaryKey: true,
        type: sequelize_1.DataTypes.STRING,
    },
    userId: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    token: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    expiresAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
    },
    createdAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP'),
    },
}, {
    sequelize: database_1.default,
    modelName: 'PasswordReset',
    schema: 'et_proforma',
});
exports.default = PasswordReset;
