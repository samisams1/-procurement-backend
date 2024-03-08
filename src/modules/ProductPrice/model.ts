import { Model, DataTypes, Association } from 'sequelize';
import sequelize from '../../config/database';
import Quotation from '../Quotation/model';
import Product from '../product/model';

interface ProductPriceAttributes {
  id?: number;
  productId: number;
  price: number;
  quotationId: number;
  status?: string;
  disCountPrice?:number;
  createdAt?: Date;
  updatedAt?: Date;
}

class ProductPrice extends Model<ProductPriceAttributes> implements ProductPriceAttributes {
  public id!: number;
  public productId!: number;
  public price!: number;
  public quotationId!: number;
  public status!: string;
  public disCountPrice!:number;
  public createdAt!: Date;
  public updatedAt!: Date;

  public readonly product?: Product[]; // Make product field an array

  public static associations: {
    product: Association<ProductPrice, Product>;
    quotation: Association<ProductPrice, Quotation>;

    
  };
}

ProductPrice.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    disCountPrice: {
      type: DataTypes.FLOAT,
    },
    quotationId: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'pending',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'ProductPrice',
    tableName: 'productPrices',
    schema: 'et_proforma', // Replace 'et_proforma' with your schema name
  }
);

ProductPrice.belongsTo(Quotation, {
  foreignKey: 'quotationId',
  as: 'quotation',
});

ProductPrice.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product',
});

export { ProductPriceAttributes };
export default ProductPrice;