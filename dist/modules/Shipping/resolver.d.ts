import Shipping from "./model";
declare const shippingResolver: {
    Query: {
        shippingById: (parent: any, { id }: {
            id: number;
        }) => Promise<Shipping | null>;
        shippingByUserId: (parent: any, { userId }: {
            userId: number;
        }) => Promise<Shipping[]>;
        shippings: () => Promise<Shipping[]>;
    };
    Mutation: {
        createShipping: (parent: any, { input }: {
            input: any;
        }) => Promise<Shipping>;
    };
};
export default shippingResolver;
