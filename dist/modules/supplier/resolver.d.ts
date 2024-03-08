import Supplier from "./model";
declare const supplierResolver: {
    Query: {
        suppliers: () => Promise<Supplier[]>;
        supplier: (_: any, { id }: {
            id: number;
        }) => Promise<Supplier | null>;
        suppliersByCategoryId: (_: any, { categoryId }: {
            categoryId: number;
        }) => Promise<Supplier[]>;
        supplierCategory: (_: any, { categoryId }: {
            categoryId: number;
        }) => Promise<Supplier[]>;
        supplierIdByUserId: (parent: any, { userId }: {
            userId: number;
        }) => Promise<Supplier | null>;
    };
};
export default supplierResolver;
