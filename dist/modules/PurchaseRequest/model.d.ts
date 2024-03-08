import { Model, Association } from 'sequelize';
import Product from '../product/model';
import User from '../user/model';
import Category from '../Category/model';
interface PurchaseRequestAttributes {
    id?: number;
    userId?: number;
    status: string;
    remark?: string;
    categoryId?: number;
    addressDetail?: string;
    estimatedDelivery?: string;
    referenceNumber?: string;
    imageUrl?: string;
    sourceType?: string;
    approvedBy?: string;
    requestedBy?: string;
}
declare class PurchaseRequest extends Model<PurchaseRequestAttributes> implements PurchaseRequestAttributes {
    userId: number;
    categoryId: number;
    status: string;
    remark?: string;
    addressDetail?: string;
    estimatedDelivery?: string;
    approvedBy?: string;
    requestedBy?: string;
    readonly products?: Product[];
    readonly customer?: User;
    readonly category?: Category;
    imageUrl?: string;
    sourceType?: string;
    static associations: {
        products: Association<PurchaseRequest, Product>;
    };
}
export default PurchaseRequest;
