"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("./model"));
const companyResolver = {
    Query: {
        companies: async () => {
            try {
                const companies = await model_1.default.findAll();
                return companies;
            }
            catch (error) {
                throw new Error('Failed to fetch companies');
            }
        },
        companyByUserId: async (parent, { userId }) => {
            try {
                const company = await model_1.default.findOne({
                    where: { userId: userId }
                });
                return company;
            }
            catch (error) {
                throw new Error('Failed to fetch companies');
            }
        },
    },
    Mutation: {
        createCompany: async (_, { input }) => {
            try {
                const company = await model_1.default.create({
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
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to create a company');
            }
        },
        updateCompany: async (_, { id, input }) => {
            try {
                const company = await model_1.default.findByPk(id);
                if (!company) {
                    throw new Error('Company not found');
                }
                await company.update(input);
                return company;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to update the company');
            }
        },
    },
};
exports.default = companyResolver;
