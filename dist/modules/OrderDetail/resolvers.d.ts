import OrderDetail from './model';
declare const orderDetailResolver: {
    Query: {
        getOrderDetailByOrderId: (parent: any, { id }: {
            id: number;
        }) => Promise<OrderDetail[]>;
        orderDetails: () => Promise<OrderDetail[]>;
    };
    Mutation: {
        createOrderDetail: (parent: any, { input }: {
            input: any;
        }) => Promise<OrderDetail>;
    };
};
export default orderDetailResolver;
