"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class Product extends sequelize_1.Model {
    // You may also need to define a static init method to initialize the model
    static initModel(sequelize) {
        Product.init({
            purchaseRequestId: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
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
            model: {
                type: sequelize_1.DataTypes.STRING,
            },
            partNumber: {
                type: sequelize_1.DataTypes.STRING,
            },
            quantity: {
                type: sequelize_1.DataTypes.STRING,
            },
            uom: {
                type: sequelize_1.DataTypes.STRING,
            },
            imageUrl: {
                type: sequelize_1.DataTypes.STRING,
            },
            // Add other column definitions
        }, {
            sequelize,
            tableName: 'products',
        });
    }
}
Product.initModel(database_1.default);
//Product.hasMany(ProductPrice as ModelCtor<Model<ProductPrice>>, { foreignKey: 'productId', as: 'productPrices' });
// Define the associations
/*Product.belongsToMany(Quotation, {
  through: 'QuotationProduct',
  as: 'quotations',
  foreignKey: 'productId',
});*/
/*Product.belongsToMany(PurchaseRequest, {
  through: 'PurchaseRequest',
  as: 'purchaseRequest',
  foreignKey: 'purchaseRequestId'
});*/
exports.default = Product;
