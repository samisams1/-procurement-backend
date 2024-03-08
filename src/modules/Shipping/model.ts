import { DataTypes, Model, Optional } from 'sequelize';
import  sequelize  from '../../config/database';
import Order from '../user/model';

interface ShippingAttributes {
  id: number;
  orderId: number;
  address: string;
  userId: number;
  status: string | null;
}

interface ShippingCreationAttributes extends Optional<ShippingAttributes, 'id'> {}

class Shipping extends Model<ShippingAttributes, ShippingCreationAttributes> implements ShippingAttributes {
  public id!: number;
  public orderId!: number;
  public address!: string;
  public userId!: number;
  public status!: string | null;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly order?: Order;
  
}

Shipping.init(
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
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    modelName: 'Shipping',
    tableName: 'shippings',
    schema: 'et_proforma',
  }
);
Shipping.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

export default Shipping;