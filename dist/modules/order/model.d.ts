import { Model, Optional } from 'sequelize';
import Supplier from '../supplier/model';
import User from '../user/model';
interface OrderAttributes {
    id: number;
    customerId: number;
    supplierId: number;
    totalPrice: number;
    tax: number | null;
    shippingCost: number | null;
    status: string | null;
    createdAt: Date;
    updatedAt: Date;
    referenceNumber: string | null;
    purchaseRequestId: number | null;
}
interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {
}
declare class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
    id: number;
    customerId: number;
    supplierId: number;
    totalPrice: number;
    tax: number | null;
    shippingCost: number | null;
    status: string | null;
    createdAt: Date;
    updatedAt: Date;
    referenceNumber: string | null;
    purchaseRequestId: number | null;
    readonly supplier?: Supplier;
    readonly customer?: User;
}
export default Order;
