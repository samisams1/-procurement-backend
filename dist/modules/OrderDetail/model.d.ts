import { Model, Optional } from 'sequelize';
import Order from '../order/model';
import Product from '../product/model';
interface OrderDetailAttributes {
    id: number;
    orderId: number;
    title: string | null;
    price: number | null;
    quantity: number | null;
    productId: number;
    createdAt: Date;
    updatedAt: Date;
}
interface OrderDetailCreationAttributes extends Optional<OrderDetailAttributes, 'id'> {
}
declare class OrderDetail extends Model<OrderDetailAttributes, OrderDetailCreationAttributes> implements OrderDetailAttributes {
    id: number;
    orderId: number;
    title: string | null;
    price: number | null;
    quantity: number | null;
    productId: number;
    createdAt: Date;
    updatedAt: Date;
    readonly order?: Order;
    readonly product?: Product;
}
export default OrderDetail;
