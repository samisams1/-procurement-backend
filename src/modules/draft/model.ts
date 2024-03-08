import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database';
import PurchaseRequest from '../PurchaseRequest/model';

interface DraftAttributes {
  id?: number;
  title: string;
  Description?: string;
  code?: string;
  manufacturer?: string;
  mark?: string;
  imageUrl?: string;
  model?: string;
  partNumber?: string;
  quantity?: number;
  uom?: string;
  attachement?: string;
  deliveryDate?: string;
  supplier?: string;
  categoryId?: number;
  remark?: string;
  purchaseRequestId?:number;
}

class Draft extends Model<DraftAttributes> implements DraftAttributes {
  public userId!: number;
  public categoryId!: number;
  public   title!: string;
  public status!: string;
  public quantity?: number;
  public remark?: string;
  public addressDetail?: string;
  public estimatedDelivery?: string;
  public referenceNumber?: string;
  public imageUrl?: string;
  public purchaseRequestId?:number;
}

Draft.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    purchaseRequestId: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
    },
    manufacturer: {
      type: DataTypes.STRING,
    },
    mark: {
      type: DataTypes.STRING,
    },
    imageUrl: {
      type: DataTypes.TEXT,
    },
    model: {
      type: DataTypes.STRING,
    },
    partNumber: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.FLOAT,
    },
    uom: {
      type: DataTypes.STRING,
    },
    attachement: {
      type: DataTypes.TEXT,
    },
    deliveryDate: {
      type: DataTypes.STRING,
    },
    supplier: {
      type: DataTypes.STRING,
    },
    categoryId: {
      type: DataTypes.INTEGER,
    },
    remark: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Draft',
    tableName: 'drafts',
    schema: 'et_proforma',
  }
);
//Draft.belongsTo(PurchaseRequest, { foreignKey: 'PurchaseRequestId', as: 'drafts' });

export default Draft;