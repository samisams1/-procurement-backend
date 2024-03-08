import PurchaseRequest from './model';
interface countPurchase {
    userId: number;
    status: string;
    supplierId: number;
}
export interface PurchaseRequestInput {
    userId?: number;
    categoryId: number;
    status: string;
    remark?: string;
    addressDetail?: string;
    estimatedDelivery?: string;
    imageUrl?: string;
    referenceNumber?: string;
    createdAt?: Date;
    sourceType: string;
    requestedBy: string;
    approvedBy: string;
}
export interface CreatePurchaseRequestInput {
    input: {
        purchaseRequest: PurchaseRequestInput;
        userId: string;
        products?: {
            id: number;
            title: string;
            mark: string;
            model: string;
            manufacturer: string;
            code: string;
            Description: string;
            partNumber: string;
            uom: string;
            quantity: number;
            imageurl?: string;
        }[];
        suppliers: {
            id: number;
        }[];
    };
}
declare const purchaseRequestResolver: {
    Query: {
        purchaseRequests: () => Promise<PurchaseRequest[]>;
        purchaseRequestByUserId: (_: any, { userId }: {
            userId: number;
        }) => Promise<PurchaseRequest[]>;
        savedRequestByUserId: (_: any, { userId }: {
            userId: number;
        }) => Promise<PurchaseRequest[]>;
        purchaseRequestById: (_: any, { id }: {
            id: number;
        }) => Promise<PurchaseRequest[]>;
        purchaseRequestBYSupplierId: (_: any, { userId, search, filter, orderBy, page, pageSize, }: {
            userId: number;
            search: string;
            filter?: {
                field: string;
                value: string;
            }[] | undefined;
            orderBy: string;
            page: number;
            pageSize: number;
        }) => Promise<PurchaseRequest[]>;
        countPurchaseRequestBystatus: (parent: any, { data }: {
            data: countPurchase;
        }) => Promise<number>;
        countAllRequestByStatus: (_: any, { status }: {
            status: string;
        }) => Promise<number>;
    };
    Mutation: {
        createPurchaseRequest: (_: any, { input }: CreatePurchaseRequestInput) => Promise<{
            suppliers: {
                connect: {
                    id: number;
                }[];
            };
            id?: number | undefined;
            userId?: number | undefined;
            status: string;
            remark?: string | undefined;
            categoryId?: number | undefined;
            addressDetail?: string | undefined;
            estimatedDelivery?: string | undefined;
            referenceNumber?: string | undefined;
            imageUrl?: string | undefined;
            sourceType?: string | undefined;
            approvedBy?: string | undefined;
            requestedBy?: string | undefined;
        } | {
            newQuotation: any[];
            suppliers: {
                connect: {
                    id: number;
                }[];
            };
            id?: number | undefined;
            userId?: number | undefined;
            status: string;
            remark?: string | undefined;
            categoryId?: number | undefined;
            addressDetail?: string | undefined;
            estimatedDelivery?: string | undefined;
            referenceNumber?: string | undefined;
            imageUrl?: string | undefined;
            sourceType?: string | undefined;
            approvedBy?: string | undefined;
            requestedBy?: string | undefined;
        }>;
        createDraftequest: (_: any, { input }: CreatePurchaseRequestInput) => Promise<{
            id?: number | undefined;
            userId?: number | undefined;
            status: string;
            remark?: string | undefined;
            categoryId?: number | undefined;
            addressDetail?: string | undefined;
            estimatedDelivery?: string | undefined;
            referenceNumber?: string | undefined;
            imageUrl?: string | undefined;
            sourceType?: string | undefined;
            approvedBy?: string | undefined;
            requestedBy?: string | undefined;
        }>;
    };
    Subscription: {
        newNotification: {
            subscribe: () => any;
        };
        updatedNotificationCount: {
            subscribe: () => any;
        };
    };
};
export default purchaseRequestResolver;
