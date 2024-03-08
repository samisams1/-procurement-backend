import ProductPrice from './model';
interface CreateProductPriceInput {
    price: number;
    disCountPrice: number;
    productId: number;
    quotationId: number;
    status: string;
}
interface UpdateProductPriceInput {
    id: number;
    shippingPrice?: number;
    status?: string;
    productPrices?: ProductPriceItemInput[];
}
declare class ProductPriceItemInput {
    id: number;
    price: number;
    disCountPrice: number;
}
interface CreateProductPriceQuotationRequestInput {
    productPrices: CreateProductPriceInput[];
    status: string;
    shippingPrice: number;
}
declare const ProductPriceResolver: {
    Query: {
        getAllProductPrices: (_: any, { id }: {
            id: number;
        }) => Promise<ProductPrice[]>;
        quotationByRequestIdAdSupplierId: (_: any, { id, supplierId }: {
            id: number;
            supplierId: number;
        }) => Promise<ProductPrice[]>;
        quotationByRequestId: (_: any, { id }: {
            id: number;
        }) => Promise<ProductPrice[]>;
    };
    Mutation: {
        createProductPrice: (_: any, { input }: {
            input: CreateProductPriceQuotationRequestInput;
        }) => Promise<void>;
        updateProductPrices: (_: any, { id, input }: {
            id: number;
            input: UpdateProductPriceInput;
        }) => Promise<ProductPrice>;
    };
};
export default ProductPriceResolver;
