import { Model, DataTypes, Association } from 'sequelize';
import sequelize from '../../config/database';
import Product from '../product/model';
import { Supplier } from '../supplier';
import  User  from '../user/model';
import Category  from '../Category/model';

interface PurchaseRequestAttributes {
  id?:number;
  userId?: number;
  status: string;
  remark?: string;
  categoryId?:number;
  addressDetail?: string;
  estimatedDelivery?: string;
  referenceNumber?: string;
  imageUrl?:string;
  sourceType?:string;
  approvedBy?:string;
  requestedBy?:string;
  
}

class PurchaseRequest extends Model<PurchaseRequestAttributes> implements PurchaseRequestAttributes {

  public userId!: number;
  public categoryId!: number;
  public status!: string;
  public remark?: string;
  public addressDetail?: string;
  public estimatedDelivery?: string;
  public approvedBy?: string;
  public requestedBy?: string;
  public readonly products?: Product[];
  public readonly customer?: User;
  public readonly category?: Category;
  public imageUrl?:string;
  public sourceType?:string;

  // Define the association methods
  public static associations: {
    
    products: Association<PurchaseRequest, Product>;
  };
}

PurchaseRequest.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
     categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:1
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
    },
    remark: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'NA',
    },    
    sourceType: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'NA',
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    addressDetail: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'NA',
    },
    estimatedDelivery: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'NA',
    },
    
    referenceNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'NA',
    },
    approvedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    requestedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'purchaseRequests',
    modelName: 'PurchaseRequest',
    timestamps: true,
  }
);

// Define the association between PurchaseRequest and Product
PurchaseRequest.hasMany(Product, {
  foreignKey: 'purchaseRequestId',
  as: 'products',
});
PurchaseRequest.belongsToMany(Supplier, { through: 'PurchaseRequestSupplier' });
PurchaseRequest.belongsTo(User, { foreignKey: 'userId', as: 'user' });
PurchaseRequest.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

export default PurchaseRequest;