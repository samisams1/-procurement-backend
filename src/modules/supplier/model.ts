import { Model, DataTypes, Optional } from 'sequelize';
import sequelize  from '../../config/database';
import Category  from '../Category/model';
import  User  from '../user/model';
interface SupplierAttributes {
  id: number;
  name?: string;
  email?: string;
  country?: string;
  city?: string;
  isVerified?:boolean;
  subCity?:string;
  houseNumber?: string;
  contactNumber?: string;
  specificName?: string;
  userId: number;
  categoryId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface SupplierCreationAttributes extends Optional<SupplierAttributes, 'id'> {}

class Supplier extends Model<SupplierAttributes, SupplierCreationAttributes> implements SupplierAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public country!: string;
  public city!: string;
  public subCity?:string;
  public houseNumber!: string;
  public contactNumber!: string;
  public specificName!: string;
  public isVerified!: boolean;
  public userId!: number;
  public categoryId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly category?: Category; // Make product field an array
  public readonly user?: User; // Make product field an array
  // Define associations
  public static associate(models: any) {
    Supplier.belongsTo(models.user, { foreignKey: 'userId' });
  }
}

Supplier.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subCity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    houseNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    specificName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Supplier',
    tableName: 'suppliers',
  }
);
Supplier.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Supplier.belongsTo(User, { foreignKey: 'userId', as: 'customer' });
export default Supplier;