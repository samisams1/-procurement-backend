import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';
import { Verification } from '../verification/model';

interface UserAttributes {
  id?: number;
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'CUSTOMER' | 'SUPPLIER';
  createdAt: Date;
  updatedAt: Date;
  status: string;
  isVerified: boolean;
  profilepicture?: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public username!: string;
  public firstName!: string;
  public lastName!: string;
  public phoneNumber!: string;
  public address!: string;
  public email!: string;
  public password!: string;
  public role!: 'ADMIN' | 'CUSTOMER' | 'SUPPLIER';
  public createdAt!: Date;
  public updatedAt!: Date;
  public status!: string;
  public isVerified!: boolean;
  public profilepicture?: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM('ADMIN', 'CUSTOMER', 'SUPPLIER'),
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    profilepicture: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    schema: 'et_proforma',
  }
);

//User.hasOne(Verification, { foreignKey: 'userId' });




export default User;