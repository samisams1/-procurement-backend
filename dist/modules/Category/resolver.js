"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const model_1 = __importDefault(require("./model"));
const CategoryResolvers = {
    Query: {
        getCategories: async () => {
            try {
                const categories = await model_1.default.findAll();
                return categories;
            }
            catch (error) {
                throw new apollo_server_1.ApolloError('Failed to fetch categories', 'DATABASE_ERROR');
            }
        },
    },
    Mutation: {
        createCategory: async (_, { name }) => {
            try {
                const category = await model_1.default.create({ name });
                return category;
            }
            catch (error) {
                throw new apollo_server_1.ApolloError('Failed to create category', 'DATABASE_ERROR');
            }
        },
    },
};
exports.default = CategoryResolvers;
