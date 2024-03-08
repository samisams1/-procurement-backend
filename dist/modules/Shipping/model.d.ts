import { Model, Optional } from 'sequelize';
import Order from '../user/model';
interface ShippingAttributes {
    id: number;
    orderId: number;
    address: string;
    userId: number;
    status: string | null;
}
interface ShippingCreationAttributes extends Optional<ShippingAttributes, 'id'> {
}
declare class Shipping extends Model<ShippingAttributes, ShippingCreationAttributes> implements ShippingAttributes {
    id: number;
    orderId: number;
    address: string;
    userId: number;
    status: string | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly order?: Order;
}
export default Shipping;
