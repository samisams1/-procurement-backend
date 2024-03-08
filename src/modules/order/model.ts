import { DataTypes, Model, Optional } from 'sequelize';
import  sequelize  from '../../config/database';
import  Supplier  from '../supplier/model';
import  User  from '../user/model';
import OrderDetail from '../OrderDetail/model';

interface OrderAttributes {
  id: number;
  customerId: number;
  supplierId: number;
  totalPrice: number;
  tax: number | null;
  shippingCost: number | null;
  status: string | null;
  createdAt: Date;
  updatedAt: Date;
  referenceNumber: string | null;
  purchaseRequestId: number | null;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public customerId!: number;
  public supplierId!: number;
  public totalPrice!: number;
  public tax!: number | null;
  public shippingCost!: number | null;
  public status!: string | null;
  public createdAt!: Date;
  public updatedAt!: Date;
  public referenceNumber!: string | null;
  public purchaseRequestId!: number | null;
  public readonly supplier?: Supplier;
  public readonly customer?: User;


}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    supplierId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tax: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    shippingCost: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
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
    referenceNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'NA',
    },
    purchaseRequestId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    schema: 'et_proforma',
  }
);
Order.belongsTo(Supplier, { foreignKey: 'supplierId', as: 'supplier' });
Order.belongsTo(User, { foreignKey: 'customerId', as: 'customer' });
export default Order;