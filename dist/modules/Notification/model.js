"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class Notification extends sequelize_1.Model {
}
Notification.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    message: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    recipientId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    specificid: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    timestamp: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: 'NA',
    },
}, {
    sequelize: database_1.default,
    modelName: 'Notification',
    tableName: 'notifications',
    schema: 'et_proforma',
});
exports.default = Notification;
