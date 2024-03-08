import { Model, DataTypes, Sequelize, Association, ModelCtor } from 'sequelize';
import sequelize from '../../config/database';
import Quotation from '../Quotation/model';
import ProductPrice from '../ProductPrice/model';
import  PurchaseRequest  from '../PurchaseRequest/model';

interface ProductAttributes {
  id?:number;
  title: string;
  mark?: string;
  model?: string;
  manufacturer?: string;
  code?: string;
  Description?: string;
  partNumber?:string;
  uom?:string;
  quantity: number;
  purchaseRequestId: number;
  imageUrl?:string;
  // Add other attributes as needed
}

interface ProductCreationAttributes extends ProductAttributes {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public quantity!: number;
  public id!: number;
  public purchaseRequestId!: number;
  public title!: string;
  public mark!: string;
  public  model!: string;
  public manufacturer!: string;
  public code!: string;
  public Description!: string;
  public partNumber!:string;
  public uom!:string;
  public imageUrl!:string;
  // Add other attributes as needed
  // Define the association methods
  public static associations: {
    quotations: Association<Product, Quotation>;
    productPrices: Association<Product, ProductPrice>;
  };
  // You may also need to define a static init method to initialize the model
  public static initModel(sequelize: Sequelize) {
    Product.init(
      {
        purchaseRequestId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
         Description: {
          type: DataTypes.STRING,
        },
         code: {
          type: DataTypes.STRING,
        },
         manufacturer: {
          type: DataTypes.STRING,
        },
         mark: {
          type: DataTypes.STRING,
        },
         model: {
          type: DataTypes.STRING,
        },
         partNumber: {
          type: DataTypes.STRING,
        },
         quantity: {
          type: DataTypes.STRING,
        },
         uom: {
          type: DataTypes.STRING,
        },
        imageUrl: {
          type: DataTypes.STRING,
        },
        // Add other column definitions
      },
      {
        sequelize,
        tableName: 'products',
      }
    );
  }

  // Add any additional associations or methods here
}

Product.initModel(sequelize);
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
export default Product;