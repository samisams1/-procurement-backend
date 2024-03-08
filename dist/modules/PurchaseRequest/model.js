"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
const model_1 = __importDefault(require("../product/model"));
const supplier_1 = require("../supplier");
const model_2 = __importDefault(require("../user/model"));
const model_3 = __importDefault(require("../Category/model"));
class PurchaseRequest extends sequelize_1.Model {
}
PurchaseRequest.init({
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
    },
    categoryId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
    },
    remark: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: 'NA',
    },
    sourceType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: 'NA',
    },
    imageUrl: {
        type: sequelize_1.DataTypes.STRING,
    },
    addressDetail: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: 'NA',
    },
    estimatedDelivery: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: 'NA',
    },
    referenceNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: 'NA',
    },
    approvedBy: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    requestedBy: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: database_1.default,
    tableName: 'purchaseRequests',
    modelName: 'PurchaseRequest',
    timestamps: true,
});
// Define the association between PurchaseRequest and Product
PurchaseRequest.hasMany(model_1.default, {
    foreignKey: 'purchaseRequestId',
    as: 'products',
});
PurchaseRequest.belongsToMany(supplier_1.Supplier, { through: 'PurchaseRequestSupplier' });
PurchaseRequest.belongsTo(model_2.default, { foreignKey: 'userId', as: 'user' });
PurchaseRequest.belongsTo(model_3.default, { foreignKey: 'categoryId', as: 'category' });
exports.default = PurchaseRequest;
