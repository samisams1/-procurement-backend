import { DataTypes, Model, Optional } from 'sequelize';
import  sequelize  from '../../config/database';

interface NotificationAttributes {
  id: number;
  type: string | null;
  message: string | null;
  recipientId: number;
  timestamp: Date;
  status: string | null;
  specificid? : number;
}

interface NotificationCreationAttributes extends Optional<NotificationAttributes, 'id'> {}

class Notification extends Model<NotificationAttributes, NotificationCreationAttributes> implements NotificationAttributes {
  public id!: number;
  public type!: string | null;
  public message!: string | null;
  public recipientId!: number;
  public specificid!:number;
  public timestamp!: Date;
  public status!: string | null;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Notification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    recipientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    specificid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'NA',
    },
  },
  {
    sequelize,
    modelName: 'Notification',
    tableName: 'notifications',
    schema: 'et_proforma',
  }
);

export default Notification;