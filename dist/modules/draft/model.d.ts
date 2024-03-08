import { Model } from 'sequelize';
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
    purchaseRequestId?: number;
}
declare class Draft extends Model<DraftAttributes> implements DraftAttributes {
    userId: number;
    categoryId: number;
    title: string;
    status: string;
    quantity?: number;
    remark?: string;
    addressDetail?: string;
    estimatedDelivery?: string;
    referenceNumber?: string;
    imageUrl?: string;
    purchaseRequestId?: number;
}
export default Draft;
