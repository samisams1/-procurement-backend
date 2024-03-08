import Payment from './model';
declare const paymentResolver: {
    Query: {
        payment: (parent: any, { id }: {
            id: number;
        }) => Promise<Payment | null>;
        paymentBycustomer: (parent: any, { customerId }: {
            customerId: number;
        }) => Promise<Payment[]>;
        payments: () => Promise<Payment[]>;
        supplierPayments: (parent: any, { id }: {
            id: number;
        }) => Promise<Payment[]>;
        countPaymentSatus: (_: any, { status }: {
            status: string;
        }) => Promise<number>;
    };
    Mutation: {
        createPayment: (parent: any, { input }: {
            input: any;
        }) => Promise<Payment>;
    };
};
export default paymentResolver;
