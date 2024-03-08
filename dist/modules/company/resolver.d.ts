import Company from "./model";
interface CreateCompanyInput {
    name: string;
    userId: number;
    email?: string;
    address?: string;
    phonenumber?: string;
    createdAt?: String;
    updatedAt?: String;
    country?: string;
    city?: string;
    houseNumber?: String;
    contactNumber?: String;
    specificName?: String;
    subCity?: String;
    isVerified?: Boolean;
}
interface UpdateCompanyInput {
    name: string;
    userId: number;
    email?: string;
    address?: string;
    phonenumber?: string;
    createdAt?: String;
    updatedAt?: String;
    country?: string;
    city?: string;
    houseNumber?: String;
    contactNumber?: String;
    specificName?: String;
    subCity?: String;
    isVerified?: Boolean;
}
declare const companyResolver: {
    Query: {
        companies: () => Promise<Company[]>;
        companyByUserId: (parent: any, { userId }: {
            userId: number;
        }) => Promise<Company | null>;
    };
    Mutation: {
        createCompany: (_: any, { input }: {
            input: CreateCompanyInput;
        }) => Promise<Company>;
        updateCompany: (_: any, { id, input }: {
            id: number;
            input: UpdateCompanyInput;
        }) => Promise<Company>;
    };
};
export default companyResolver;
