import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database';
import { Supplier } from '../supplier';
import { User } from '../user';
import ProductPrice from '../ProductPrice/model';
import  PurchaseRequest  from '../PurchaseRequest/model';
class Quotation extends Model {
  public id!: number;
  public supplierId?: number;
  public customerId?: number;
  public shippingPrice?: number;
  public availabilityDate?:number;
  public otherPayment?:number;
  public createdAt!: Date;
  public status!: string;
  public purchaseRequestId?: number;
  public readonly supplier?: Supplier;
  public readonly customer?: User;
  public readonly purchaseRequest?: PurchaseRequest;
  public readonly products?: ProductPrice[];
}

Quotation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
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
    otherPayment: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    availabilityDate: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    purchaseRequestId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Quotation',
    tableName: 'quotations',
    schema: 'et_proforma',
  }
);

// Define the association between Quotation and Supplier models
// Define the association between Quotation and Supplier models
Quotation.belongsTo(Supplier, { foreignKey: 'supplierId', as: 'supplier' });
Quotation.belongsTo(User, { foreignKey: 'customerId', as: 'customer' });
Quotation.belongsTo(PurchaseRequest, { foreignKey: 'purchaseRequestId', as: 'purchaseRequest' });

/*Quotation.hasMany(ProductPrice, {
  foreignKey: 'quotationId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  as: 'productPrices',
});*/
export default Quotation;
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