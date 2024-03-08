import { Model, Optional } from 'sequelize';
import Order from '../order/model';
interface PaymentAttributes {
    id: number;
    amount: number;
    paidAt: Date;
    paymentMethod: string | null;
    userId: number;
    orderId: number;
    status: string | null;
    referenceNumber: string | null;
    fullName: string;
}
interface PaymentCreationAttributes extends Optional<PaymentAttributes, 'id'> {
}
declare class Payment extends Model<PaymentAttributes, PaymentCreationAttributes> implements PaymentAttributes {
    id: number;
    amount: number;
    paidAt: Date;
    paymentMethod: string | null;
    userId: number;
    orderId: number;
    status: string | null;
    referenceNumber: string | null;
    fullName: string;
    readonly customer?: Order;
}
export default Payment;
