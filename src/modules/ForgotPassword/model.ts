import { DataTypes, Model, Optional } from 'sequelize';
import  sequelize  from '../../config/database';

interface ForgotPasswordAttributes {
  id: number;
  email: string;
  token: string;
  expiresAt: Date | null;
  createdAt: Date;
}

interface ForgotPasswordCreationAttributes extends Optional<ForgotPasswordAttributes, 'id'> {}

class ForgotPassword extends Model<ForgotPasswordAttributes, ForgotPasswordCreationAttributes> implements ForgotPasswordAttributes {
  public id!: number;
  public email!: string;
  public token!: string;
  public expiresAt!: Date | null;
  public createdAt!: Date;
}

ForgotPassword.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    expiresAt: {
      type: DataTypes.DATE,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'ForgotPassword',
    tableName: 'forgotPasswords',
    schema: 'et_proforma', // Replace with your actual schema name
    timestamps: false,
  }
);

export default ForgotPassword;