import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';
import Order from '../order/model';

interface PaymentAttributes {
  id: number;
  amount: number;
  paidAt: Date;
  paymentMethod: string | null;
  userId: number;
  orderId: number;
  status: string | null;
  referenceNumber: string | null;
  fullName: string;
}

interface PaymentCreationAttributes extends Optional<PaymentAttributes, 'id'> {}

class Payment extends Model<PaymentAttributes, PaymentCreationAttributes> implements PaymentAttributes {
  public id!: number;
  public amount!: number;
  public paidAt!: Date;
  public paymentMethod!: string | null;
  public userId!: number;
  public orderId!: number;
  public status!: string | null;
  public referenceNumber!: string | null;
  public fullName!: string;
  public readonly customer?: Order;

}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    paidAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'pending',
    },
    referenceNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'NA',
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Payment',
    tableName: 'payments',
    schema: 'et_proforma',
  }
);
Payment.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });
export default Payment;