"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
const supplier_1 = require("../supplier");
const user_1 = require("../user");
const model_1 = __importDefault(require("../PurchaseRequest/model"));
class Quotation extends sequelize_1.Model {
}
Quotation.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    supplierId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    customerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    shippingPrice: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
    availabilityDate: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    sentBy: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    remark: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    purchaseRequestId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Quotation',
    tableName: 'quotations',
    schema: 'et_proforma',
});
// Define the association between Quotation and Supplier models
// Define the association between Quotation and Supplier models
Quotation.belongsTo(supplier_1.Supplier, { foreignKey: 'supplierId', as: 'supplier' });
Quotation.belongsTo(user_1.User, { foreignKey: 'customerId', as: 'customer' });
Quotation.belongsTo(model_1.default, { foreignKey: 'purchaseRequestId', as: 'purchaseRequest' });
/*Quotation.hasMany(ProductPrice, {
  foreignKey: 'quotationId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  as: 'productPrices',
});*/
exports.default = Quotation;
//Quotation.belongsTo(Supplier, { foreignKey: 'supplierId', as: 'supplier' });
//Quotation.belongsTo(User, { foreignKey: 'customerId', as: 'customer' });
/*import { Model, DataTypes, Association } from 'sequelize';
import sequelize from '../../config/database';
import Product from '../product/model';
import User from '../user/model';
import Supplier from '../supplier/model';
import PurchaseRequest from '../PurchaseRequest/model';

interface QuotationAttributes {
  supplierId?: number;
  customerId?: number;
  shippingPrice?: number;
  status: string;
  purchaseRequestId?: number;

  readonly supplier?: Supplier;
  readonly customer?: User;
}

class Quotation extends Model<QuotationAttributes> implements QuotationAttributes {
  public supplierId?: number;
  public customerId?: number;
  public shippingPrice?: number;
  public status!: string;
  public purchaseRequestId?: number;

  public readonly supplier?: Supplier;
  public readonly customer?: User;
  public readonly products?: Product[];

  // Define the association methods
  public static associations: {
    products: Association<Quotation, Product>;
  };
}

Quotation.init(
  {
    supplierId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    shippingPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    purchaseRequestId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: 'Quotation',
    tableName: 'quotations',
    schema: 'et_proforma',
  }
);

// Define the associations
Quotation.belongsTo(Supplier, { foreignKey: 'supplierId', as: 'supplier' });
Quotation.belongsTo(User, { foreignKey: 'customerId', as: 'customer' });
Quotation.belongsTo(PurchaseRequest, { foreignKey: 'purchaseRequestId', as: 'purchaseRequest' });
//Quotation.hasMany(Product, { foreignKey: 'quotationId', as: 'products' });

export default Quotation;*/ 
