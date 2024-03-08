import { DataTypes, Model, Optional } from 'sequelize';
import  sequelize  from '../../config/database';
import Order from '../order/model';
import Product from '../product/model';

interface OrderDetailAttributes {
  id: number;
  orderId: number;
  title: string | null;
  price: number | null;
  quantity: number | null;
  productId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface OrderDetailCreationAttributes extends Optional<OrderDetailAttributes, 'id'> {}

class OrderDetail extends Model<OrderDetailAttributes, OrderDetailCreationAttributes> implements OrderDetailAttributes {
  public id!: number;
  public orderId!: number;
  public title!: string | null;
  public price!: number | null;
  public quantity!: number | null;
  public productId!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
  public readonly order?: Order;
  public readonly product?: Product;
}

OrderDetail.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
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
    modelName: 'OrderDetail',
    tableName: 'orderdetails',
    schema: 'et_proforma',
  }
);
OrderDetail.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });
OrderDetail.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

export default OrderDetail;