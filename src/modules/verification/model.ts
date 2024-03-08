import { Model, DataTypes, Sequelize } from 'sequelize';
import { User } from '../user';
import sequelize from '../../config/database';

class Verification extends Model {
  public id!: number;
  public token!: string;
  public userId!: number;

  // Define associations
  public user!: User;

}

Verification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      unique: true,
    },
  },
  {
    modelName: 'Verification',
    sequelize,
    schema: 'et_proforma', 
    tableName: 'verifications', 
  }
);
Verification.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export { Verification };