import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database';

class Company extends Model {
  public id!: number;
  public name!: string;
  public userId!: number;
  public email!: string | null;
  public address!: string | null;
  public phonenumber!: string | null;
  public createdAt!: Date;
  public updatedAt!: Date;
  public country!: string | null;
  public city!: string | null;
  public houseNumber!: string | null;
  public contactNumber!: string | null;
  public specificName!: string | null;
  public subCity!: string | null;
  public isVerified!: boolean | null;

  // Define associations, if any
}

Company.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    phonenumber: {
      type: DataTypes.STRING(255),
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
    country: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    houseNumber: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    contactNumber: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    specificName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    subCity: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Company',
    tableName: 'companies',
    schema: 'et_proforma',
  }
);

export default Company;