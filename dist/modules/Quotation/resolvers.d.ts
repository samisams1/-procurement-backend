import Quotation from "./model";
interface CreateQuotationInput extends Partial<Quotation>, Record<string, any> {
}
interface UpdateQuotationInput extends Partial<CreateQuotationInput> {
    id: number;
}
interface countQuotation {
    supplierId: number;
    status: string;
}
interface countPurchase {
    customerId: number;
    status: string;
}
declare const quotationResolver: {
    Query: {
        getQuotation: (_: any, { id }: {
            id: number;
        }) => Promise<Quotation | null>;
        countGetQuotationByStatus: (parent: any, { data }: {
            data: countPurchase;
        }) => Promise<number>;
        countQuotationBySupplierId: (parent: any, { data }: {
            data: countQuotation;
        }) => Promise<number>;
        quotationBydSupplierId: (_: any, { suplierId }: {
            suplierId: number;
        }) => Promise<Quotation[]>;
    };
    Mutation: {
        updateQuotation: (_: any, { id, input }: {
            id: number;
            input: UpdateQuotationInput;
        }) => Promise<Quotation>;
        deleteQuotation: (_: any, { id }: {
            id: number;
        }) => Promise<boolean>;
    };
};
export default quotationResolver;
