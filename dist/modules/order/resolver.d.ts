import Order from './model';
import OrderDetail from '../OrderDetail/model';
interface CreateOrderInput {
    customerId: number;
    supplierId: number;
    orderDetails: {
        title: string;
        productId: number;
        price: number;
        quantity: number;
    }[];
    productPriceIds: number[];
    totalPrice: number;
    tax: number;
    status: string;
    shippingCost: number;
}
interface OrderWithDetails extends Order {
    orderDetails: OrderDetail[];
}
interface countOrder {
    customerId: number;
    status: string;
    supplierId: number;
}
declare const orderResolver: {
    Query: {
        getOrderById: (parent: any, { id }: {
            id: number;
        }) => Promise<Order | null>;
        getOrderByUserId: (parent: any, { id }: {
            id: number;
        }) => Promise<Order[]>;
        getOrderBySupplierId: (parent: any, { id, status }: {
            id: number;
            status: string;
        }) => Promise<Order[]>;
        getApprovedOrderByCustomerId: (parent: any, { id }: {
            id: number;
        }) => Promise<Order[]>;
        orders: () => Promise<Order[]>;
        countOrderBystatus: (parent: any, { data }: {
            data: countOrder;
        }) => Promise<number>;
        countOrderBySupplierId: (parent: any, { data }: {
            data: countOrder;
        }) => Promise<number>;
        countAllrderByStatus: (_: any, { status }: {
            status: string;
        }) => Promise<number>;
    };
    Subscription: {
        orderUpdated: {
            subscribe: () => AsyncIterator<unknown, any, undefined>;
        };
    };
    Mutation: {
        createOrder: (_: any, { input }: {
            input: CreateOrderInput[];
        }) => Promise<OrderWithDetails[]>;
        updateOrder: (_: any, { id, input }: {
            id: number;
            input: string;
        }) => Promise<Order>;
    };
};
export default orderResolver;
