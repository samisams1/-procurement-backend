"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Verification = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("../user");
const database_1 = __importDefault(require("../../config/database"));
class Verification extends sequelize_1.Model {
}
exports.Verification = Verification;
Verification.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
    },
}, {
    modelName: 'Verification',
    sequelize: database_1.default,
    schema: 'et_proforma',
    tableName: 'verifications',
});
Verification.belongsTo(user_1.User, { foreignKey: 'userId', as: 'user' });
