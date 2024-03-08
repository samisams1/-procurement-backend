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
const companyResolver = {
  Query: {
    companies: async () => {
      try {
        const companies = await Company.findAll();
        return companies;
      } catch (error) {
        throw new Error('Failed to fetch companies');
      }
    },
    companyByUserId: async (parent: any, { userId }: { userId: number }) => {
        
        try {
          const company = await Company.findOne({
            where:{userId:userId}
          });

          return company;
        } catch (error) {
          throw new Error('Failed to fetch companies');
        }
      },
  },
  Mutation: {
    createCompany: async (_: any, { input }: { input: CreateCompanyInput }) => {
        try {
          const company = await Company.create({
            ...input,
           /* country: input.country ? input.country : undefined,
            city: input.city ? input.city : undefined,
            houseNumber: input.houseNumber ? input.houseNumber : undefined,
            contactNumber: input.contactNumber ? input.contactNumber : undefined,
            specificName: input.specificName ? input.specificName : undefined,
            subCity: input.subCity ? input.subCity : undefined,
            isVerified: false,*/
          });
          return company;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to create a company');
        }
      },
      updateCompany: async (_: any, { id, input }: { id: number, input: UpdateCompanyInput }) => {
        try {
          const company = await Company.findByPk(id);
          if (!company) {
            throw new Error('Company not found');
          }
  
          await company.update(input);
          return company;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to update the company');
        }
      },
  },
};

export default companyResolver;