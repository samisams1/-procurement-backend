import { Model } from 'sequelize';
import { Supplier } from '../supplier';
import { User } from '../user';
import ProductPrice from '../ProductPrice/model';
import PurchaseRequest from '../PurchaseRequest/model';
declare class Quotation extends Model {
    id: number;
    supplierId?: number;
    customerId?: number;
    shippingPrice?: number;
    availabilityDate?: number;
    otherPayment?: number;
    createdAt: Date;
    status: string;
    purchaseRequestId?: number;
    readonly supplier?: Supplier;
    readonly customer?: User;
    readonly purchaseRequest?: PurchaseRequest;
    readonly products?: ProductPrice[];
}
export default Quotation;
